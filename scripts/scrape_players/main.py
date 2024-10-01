import sys
from selenium import webdriver
from lib import success, fail, log
from lib import parse_stats_table, parse_bio_table, join_data, match_schema
# from selenium.webdriver.chrome.options import Options

import requests
import json
import os
import time

###############################################################################
# CONSTANTS

SCRIPT_PATH = f'{os.getcwd()}/scripts/scrape_players'
OUT_DATA_FILENAME = 'players.json'
OUT_PATH = f'{SCRIPT_PATH}/{OUT_DATA_FILENAME}'

SERVER_PORT = 3000
SERVER_URL = f'http://localhost:{SERVER_PORT}/api/player/seed'

STAT_LINK = 'https://www.nba.com/stats/players/traditional?SeasonType=Regular+Season'
STAT_TABLE_XPATH = '//*[@id="__next"]/div[2]/div[2]/div[3]/section[2]/div/div[2]/div[3]/table'
STAT_DROPDOWN_XPATH = '//*[@id="__next"]/div[2]/div[2]/div[3]/section[2]/div/div[2]/div[2]/div[1]/div[3]/div/label/div/select'

BIO_LINK = 'https://www.nba.com/players'
BIO_TABLE_XPATH = '//*[@id="__next"]/div[2]/div[2]/main/div[2]/section/div/div[2]/div[2]/div/div/div/table'
BIO_DROPDOWN_XPATH = '//*[@id="__next"]/div[2]/div[2]/main/div[2]/section/div/div[2]/div[1]/div[7]/div/div[3]/div/label/div/select'
			
###############################################################################
# MAIN

WEBSCRAPE = False
POST_DATA = False

user_args = sys.argv[1:]
if "-scrape" in user_args:
	WEBSCRAPE = True
if "-post" in user_args:
	POST_DATA = True

if WEBSCRAPE:
	start_time = time.time()
	# chrome_options = Options()
	# chrome_options.add_argument("--headless=new")
	# DRIVER = webdriver.Chrome(options=chrome_options)
	DRIVER = webdriver.Chrome()

	id_to_stats = parse_stats_table(DRIVER)
	id_to_bios = parse_bio_table(DRIVER)

	log('Closing driver')
	DRIVER.quit()

	# process collected data
	players_data_raw = join_data(id_to_stats, id_to_bios)

	# reformat data to match schema
	players_data = match_schema(players_data_raw)


	# write to json file
	log(f'Writing data to {OUT_DATA_FILENAME}')
	with open(OUT_PATH, 'w') as file:
		json.dump(players_data, file, indent=4)
	
	success(f'Success: {OUT_DATA_FILENAME} created')
	end_time = time.time()
	log(f'TIME: {end_time - start_time}')

class ApiError(Exception):
	pass

if POST_DATA:
	# get .json as a python obj
	players = []
	with open(OUT_PATH, 'r') as file:
		players = json.load(file)

	# convert python obj into json str
	players_json = json.dumps(players)

	try:
		# post updated docs to collection
		response = requests.put(SERVER_URL, data=players_json)
		if(response.status_code != 200):
			raise ApiError('Could not update data:', response)
		success('Success: Data updated!')
	except ApiError as err:
		fail('Error: ' + str(err))
