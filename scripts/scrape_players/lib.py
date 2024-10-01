from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select

import os

###############################################################################
# CONSTANTS

BLUE = '\033[34m'
GREEN = '\033[92m'
RED = '\033[91m'
RESET = '\033[0m'

LOG_PATH = f'{os.getcwd()}/scripts/scrape_players/log'
LOG_STATS_FILENAME = 'stats.txt'
LOG_BIO_FILENAME = 'bio.txt'
LOG_JOIN_DATA_FILENAME = 'join-stats-bios.txt'
LOG_MATCH_SCHEMA_FILENAME = 'match-schema.txt'
TIMEOUT = 10

STAT_LINK = 'https://www.nba.com/stats/players/traditional?SeasonType=Regular+Season'
STAT_TABLE_XPATH = '//*[@id="__next"]/div[2]/div[2]/div[3]/section[2]/div/div[2]/div[3]/table'
STAT_DROPDOWN_XPATH = '//*[@id="__next"]/div[2]/div[2]/div[3]/section[2]/div/div[2]/div[2]/div[1]/div[3]/div/label/div/select'

BIO_LINK = 'https://www.nba.com/players'
BIO_TABLE_XPATH = '//*[@id="__next"]/div[2]/div[2]/main/div[2]/section/div/div[2]/div[2]/div/div/div/table'
BIO_DROPDOWN_XPATH = '//*[@id="__next"]/div[2]/div[2]/main/div[2]/section/div/div[2]/div[1]/div[7]/div/div[3]/div/label/div/select'

PREFIX = BLUE + f'[scrape-players]: ' + RESET

###############################################################################
# PRINT MESSAGES

def log(msg):
	print(PREFIX + msg)

def success(msg):
	print(PREFIX + GREEN + msg + RESET)

def fail(msg):
	print(PREFIX + RED + msg + RESET)

###############################################################################
# PARSE STATS TABLE

def parse_stats_table(DRIVER: webdriver) -> dict:
	headers: dict = {}
	id_to_row_data: dict = {} # return obj
	count = 0
	wait = WebDriverWait(DRIVER, TIMEOUT)

	log(f'Opening {STAT_LINK}')
	DRIVER.get(STAT_LINK)

	try:
		log(f'Waiting for table to become visible')
		table = wait.until(EC.visibility_of_element_located((By.XPATH, STAT_TABLE_XPATH)))
	except Exception as err:
		fail(f'Error: Could not locate the table within {TIMEOUT} seconds.\n{err}')
		exit(-1)

	try:
		log(f'Selecting "All" from dropdown')
		dropdown = wait.until(EC.element_to_be_clickable((By.XPATH, STAT_DROPDOWN_XPATH)))
		DRIVER.execute_script("arguments[0].click();", dropdown)
		Select(dropdown).select_by_visible_text('All')
	except Exception as err:
		fail(f'Error: Could not select "All" from the dropdown within {TIMEOUT} seconds.\n{err}')
		exit(-1)

	try:
		log('Getting table headers')
		header_row_elem = table.find_element(By.TAG_NAME, 'thead').find_element(By.TAG_NAME, 'tr')
		header_col_elems = header_row_elem.find_elements(By.TAG_NAME, 'th')

		# only store column info we want and index so we can quickly access the desired column for each row
		for i, c in enumerate(header_col_elems):
			if c.text.lower() == 'player': headers[i] = c.text.lower()
			elif c.text.lower() == 'age': headers[i] = c.text.lower()
			elif c.text.lower() == 'gp': headers[i] = c.text.lower()
			elif c.text.lower() == 'min': headers[i] = c.text.lower()
			elif c.text.lower() == 'pts': headers[i] = c.text.lower()
			elif c.text.lower() == 'fg%': headers[i] = c.text.lower()
			elif c.text.lower() == '3p%': headers[i] = c.text.lower()
			elif c.text.lower() == 'ft%': headers[i] = c.text.lower()
			elif c.text.lower() == 'reb': headers[i] = c.text.lower()
			elif c.text.lower() == 'ast': headers[i] = c.text.lower()
			elif c.text.lower() == 'tov': headers[i] = c.text.lower()
			elif c.text.lower() == 'stl': headers[i] = c.text.lower()
			elif c.text.lower() == 'blk': headers[i] = c.text.lower()
			elif c.text.lower() == '+/-': headers[i] = c.text.lower()
	except Exception as err:
		fail(f'Error: Failed to get table header data.\n{err}')
		exit(-1)

	try:
		log('Getting table body\n')
		file = open(f'{LOG_PATH}/{LOG_STATS_FILENAME}', 'w')
		body_row_elems = table.find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')

		for row in body_row_elems:
			count += 1
			nba_id = '' # key
			row_data: dict = {} # value (holding each stat)
			# id_to_row_data: dict = {}

			body_col_elems = row.find_elements(By.TAG_NAME, 'td')
			# only access the index of data from headers
			for key_i in headers:
				# assign header -> associated column text
				row_data[headers[key_i]] = body_col_elems[key_i].text

				# at player column, get nbaId
				if nba_id == '' and headers[key_i].lower() == "player":
					a_tag = body_col_elems[key_i].find_element(By.TAG_NAME, 'a')
					href = a_tag.get_attribute('href') # /stats/player/203954

					# remove rightmost slash, convert href to array delimited by '/', get last elem as id
					nba_id = href.rstrip('/').split('/')[-1]

			id_to_row_data[nba_id] = row_data

			log_statement = f'({count}/{len(body_row_elems)}): {row_data["player"]} [{nba_id}]'
			success(log_statement)
			file.write(log_statement + '\n')
		
		success(f'Table successfully processed')
		log(f'Logs: {LOG_PATH}/{LOG_STATS_FILENAME}')
		file.close()
		return id_to_row_data
	except Exception as err:
		fail(f'Error: Failed to get table body data.\n{err}')
		exit(-1)

###############################################################################
# PARSE BIO TABLE

def parse_bio_table(DRIVER: webdriver) -> dict:
	headers: dict = {}
	id_to_row_data: dict = {} # return obj
	count = 0
	wait = WebDriverWait(DRIVER, TIMEOUT)

	log(f'Opening {BIO_LINK}')
	DRIVER.get(BIO_LINK)

	try:
		log(f'Waiting for table to become visible')
		table = wait.until(EC.visibility_of_element_located((By.XPATH, BIO_TABLE_XPATH)))
	except Exception as err:
		fail(f'Error: Could not locate the table within {TIMEOUT} seconds.\n{err}')
		exit(-1)

	try:
		log(f'Selecting "All" from dropdown')
		dropdown = wait.until(EC.element_to_be_clickable((By.XPATH, BIO_DROPDOWN_XPATH)))
		dropdown.click()
		Select(dropdown).select_by_visible_text('All')
	except Exception as err:
		fail(f'Error: Could not select "All" from the dropdown within {TIMEOUT} seconds.\n{err}')
		exit(-1)

	try:
		log('Getting table headers')
		header_row_elem = table.find_element(By.TAG_NAME, 'thead').find_element(By.TAG_NAME, 'tr')
		header_col_elems = header_row_elem.find_elements(By.TAG_NAME, 'th')

		# store every column
		for i, c in enumerate(header_col_elems):
			headers[i] = c.text.lower()

	except Exception as err:
		fail(f'Error: Failed to get table header data.\n{err}')
		exit(-1)

	try:
		log('Getting table body\n')
		file = open(f'{LOG_PATH}/{LOG_BIO_FILENAME}', 'w')
		body_row_elems = table.find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')

		for row in body_row_elems:
			count += 1
			nba_id = '' # key
			row_data: dict = {} # value (holding each bio info)

			body_col_elems = row.find_elements(By.TAG_NAME, 'td')
			# only access the index of data from headers
			for key_i in headers:
				# at player column, get nbaId
				if nba_id == '' and headers[key_i] == "player":
					# .replace \n bc PLAYER .text is 2 children elems, firstname + lastname
					row_data[headers[key_i]] = body_col_elems[key_i].text.replace("\n", " ")

					a_tag = body_col_elems[key_i].find_element(By.TAG_NAME, 'a')
					href = a_tag.get_attribute('href') # /player/1628389/bam-adebayo

					# remove rightmost '/', then delimit by '/' and get second-last elem as nba-id
					nba_id = href.rstrip('/').split('/')[-2]
				# assign header -> associated column text
				else:
					row_data[headers[key_i]] = body_col_elems[key_i].text

			id_to_row_data[nba_id] = row_data

			log_statement = f'({count}/{len(body_row_elems)}): {row_data["player"]} [{nba_id}]'
			success(log_statement)
			file.write(log_statement + '\n')
		
		success(f'Table successfully processed')
		log(f'Logs: {LOG_PATH}/{LOG_BIO_FILENAME}')
		file.close()
		return id_to_row_data
	except Exception as err:
		fail(f'Error: Failed to get table body data.\n{err}')
		exit(-1)

###############################################################################
# FUNCS FOR FILTERING RAW TABLE DATA

# match stats/bios data by nba_id, then modify data to follow Player's database schema attributes
def join_data(id_to_stats: dict, id_to_bios: dict) -> dict:
	id_to_data: dict = {} # { nbaId -> { stats-data, bios-data }, ... }
	file = open(f'{LOG_PATH}/{LOG_JOIN_DATA_FILENAME}', 'w')

	for nba_id in id_to_bios:
		# player has stats + bios
		if nba_id in id_to_stats:
			id_to_data[nba_id] = id_to_stats[nba_id] | id_to_bios[nba_id]
			log_statement = f"{id_to_data[nba_id]['player']} matched stats + bios"
			success(log_statement)
			file.write(log_statement + '\n')

		# player has no stats (give default stat values)
		else:
			id_to_data[nba_id] = id_to_bios[nba_id]
			log_statement = f"{id_to_data[nba_id]['player']} had no stats data, using default"
			log(log_statement)
			file.write(log_statement + '\n')

			id_to_data[nba_id]['gp'] = 0
			id_to_data[nba_id]['age'] = 0
			id_to_data[nba_id]['min'] = 0.0
			id_to_data[nba_id]['pts'] = 0.0
			id_to_data[nba_id]['fg%'] = 0.0
			id_to_data[nba_id]['3p%'] = 0.0
			id_to_data[nba_id]['ft%'] = 0.0
			id_to_data[nba_id]['reb'] = 0.0
			id_to_data[nba_id]['ast'] = 0.0
			id_to_data[nba_id]['tov'] = 0.0
			id_to_data[nba_id]['stl'] = 0.0
			id_to_data[nba_id]['blk'] = 0.0
			id_to_data[nba_id]['+/-'] = 0.0

	log(f'Logs: {LOG_PATH}/{LOG_JOIN_DATA_FILENAME}')
	return id_to_data

def match_schema(players_data: dict) -> list[dict]:
	formatted_players = []
	file = open(f'{LOG_PATH}/{LOG_MATCH_SCHEMA_FILENAME}', 'w')

	for nba_id in players_data:
		data: dict = players_data[nba_id]
		player: dict = {
			'nbaId': nba_id,
			'name': data['player'],
			'age': int(data['age']),
			'height': data['height'],
			'weight': data['weight'],
			'position': data['position'],
			'country': data['country'],
			'lastAttended': data['last attended'],
			'jersey': data['number'],
			'teamAbbreviation': data['team'],
			'regularStats': {
				'type': 'REGULAR',
				'gp': int(data['gp']),
				'ppg': float(data['pts']),
				'apg': float(data['ast']),
				'rpg': float(data['reb']),
				'spg': float(data['stl']),
				'bpg': float(data['blk']),
				'tpg': float(data['tov']),
				'mpg': float(data['min']),
				'fgPct': float(data['fg%']),
				'fg3Pct': float(data['3p%']),
				'ftPct': float(data['ft%']),
				'plusMinus': float(data['+/-'])
			}
		}
		formatted_players.append(player)
		log_statement = f"{player['name']} successfully re-formatted"
		success(log_statement)
		file.write(log_statement + '\n')

	log(f'Logs: {LOG_PATH}/{LOG_MATCH_SCHEMA_FILENAME}')
	return formatted_players
