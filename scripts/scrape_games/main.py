from selenium import webdriver

import requests
import json
import os
import sys

from lib import keep_loading_more, parse_schedule_weeks
from lib import alert, success, fail

###############################################################################
# CONSTANTS

SERVER_PORT = 3000
SERVER_URL = f'http://localhost:{SERVER_PORT}/api/game'

SCRIPT_PATH = f'{os.getcwd()}/scripts/scrape_games'

OUT_DATA_FILENAME = 'games.json'
OUT_PATH = f'{SCRIPT_PATH}/{OUT_DATA_FILENAME}'

# regular season, all months, all teams
NBA_SCHEDULE_LINK = 'https://www.nba.com/schedule?cal=all&pd=false&region=1&season=Regular%20Season'

###############################################################################

WEBSCRAPE = False
POST_DATA = False

user_args = sys.argv[1:]
if "-scrape" in user_args:
	WEBSCRAPE = True
if "-post" in user_args:
	POST_DATA = True

if WEBSCRAPE:
	# define webdriver
	DRIVER = webdriver.Chrome()

	# open link
	alert(f"Opening: {NBA_SCHEDULE_LINK}")
	DRIVER.get(NBA_SCHEDULE_LINK)
	DRIVER.maximize_window()

	# keep clicking "show more" dropdown until all weeks are shown (button no longer appears)
	keep_loading_more(DRIVER)

	GAMES_DATA = parse_schedule_weeks(DRIVER)

	with open(OUT_PATH, 'w') as file:
		json.dump(GAMES_DATA, file, indent=4)

	success(f'Success: {OUT_DATA_FILENAME} created!')

class ApiError(Exception):
	pass

if POST_DATA:
	GAMES_DATA = []

	# get .json as a python obj
	with open(OUT_PATH, 'r') as file:
		GAMES_DATA = json.load(file)

	# convert python obj into json str
	GAMES_DATA_JSON = json.dumps(GAMES_DATA)

	try:
		# drop all from collection
		response = requests.delete(SERVER_URL)
		if (response.status_code != 200):
			raise ApiError('Could not delete documents from collection')
		
		# post updated docs to collection
		response = requests.post(SERVER_URL, data=GAMES_DATA_JSON)
		if (response.status_code != 200):
			raise ApiError('Could not post data:', response)
	
		success('Success: Data updated!')

	except ApiError as err:
		fail('Error: ' + str(err))
	