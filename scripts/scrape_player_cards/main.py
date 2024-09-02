from lib import parse_nba_table
from lib import filter_stats_and_bios
from lib import player_card
from lib import success, fail

import requests
import json
import os

###############################################################################
# CONSTANTS

SCRIPT_PATH = f'{os.getcwd()}/scripts/scrape_player_cards'

WEBSCRAPE = False
POST_DATA = True
SERVER_PORT = 3000
SERVER_URL = f'http://localhost:{SERVER_PORT}/api/player'

STAT_LINK = 'https://www.nba.com/stats/players/traditional?SeasonType=Regular+Season'
STAT_TABLE_XPATH = '//*[@id="__next"]/div[2]/div[2]/div[3]/section[2]/div/div[2]/div[3]/table'
STAT_DROPDOWN_XPATH = '//*[@id="__next"]/div[2]/div[2]/div[3]/section[2]/div/div[2]/div[2]/div[1]/div[3]/div/label/div/select'

BIO_LINK = 'https://www.nba.com/players'
BIO_TABLE_XPATH = '//*[@id="__next"]/div[2]/div[2]/main/div[2]/section/div/div[2]/div[2]/div/div/div/table'
BIO_DROPDOWN_XPATH = '//*[@id="__next"]/div[2]/div[2]/main/div[2]/section/div/div[2]/div[1]/div[7]/div/div[3]/div/label/div/select'
			
###############################################################################
# MAIN

if WEBSCRAPE:
	raw_stats, name_keys1 = parse_nba_table(STAT_LINK, STAT_TABLE_XPATH, STAT_DROPDOWN_XPATH)
	raw_bios, name_keys2 = parse_nba_table(BIO_LINK, BIO_TABLE_XPATH, BIO_DROPDOWN_XPATH)

	# go by set of less set of names
	name_keys = 0
	if len(name_keys1) <= len(name_keys2):
		name_keys = name_keys1
	else:
		name_keys = name_keys2

	# filter raw data as { name_keys: { data } }
	stats, bios = filter_stats_and_bios(raw_stats, raw_bios)

	# create card by merging stat/bio data into an obj (card)
	player_cards = []
	for name in name_keys:
		player_cards.append(player_card(stats, bios, name))

	# write to json file
	with open(f'{SCRIPT_PATH}/player_cards.json', 'w') as file:
		json.dump(player_cards, file, indent=4)

	success('Success: player_cards.json created!')

class ApiError(Exception):
	pass

if POST_DATA:
	# get .json as a python obj
	player_cards = []
	with open(f'{SCRIPT_PATH}/player_cards.json', 'r') as file:
		player_cards = json.load(file)

	# convert python obj into json str
	player_cards_json = json.dumps(player_cards)

	try:
		# drop all from docs from collection
		response = requests.delete(SERVER_URL)
		if(response.status_code != 200): # correct status code?
			print(response.status_code)
			raise ApiError('Could not delete documents from collection')

		# post updated docs to collection
		response = requests.post(SERVER_URL, data=player_cards_json)
		if(response.status_code != 200):
			raise ApiError('Could not post data')
		
		success('Success: Data updated!')
		
	except ApiError as err:
		fail('Error: ' + str(err))
