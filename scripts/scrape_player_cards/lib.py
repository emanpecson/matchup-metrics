from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select

import json
import csv

###############################################################################
# CONSTANTS

GREEN = '\033[92m'
YELLOW = '\033[93m'
RED = '\033[91m'
RESET = '\033[0m'

###############################################################################
# PRINT MESSAGES

def alert(msg):
	print(YELLOW + msg + RESET)

def success(msg):
	print(GREEN + msg + RESET)

def fail(msg):
	print(RED + msg + RESET)

###############################################################################
# PARSE FUNC

# Parse table from given link and return the raw body of the table as obj
def parse_nba_table(link, table_xpath, dropdown_xpath) -> list[list[dict], list[str]]:
	headers: list[str] = []
	body: list[dict] = []
	name_keys: list[str] = []
	count = 0
	timeout = 10

	driver = webdriver.Safari()
	driver.get(link)
	driver.maximize_window() # for now, safari doesn't support headless? try server or chrome
	wait = WebDriverWait(driver, timeout)

	alert('Waiting for table to become visible')
	table = wait.until(EC.visibility_of_element_located((By.XPATH, table_xpath)))

	alert('Selecting "All" from dropdown')
	dropdown = wait.until(EC.element_to_be_clickable((By.XPATH, dropdown_xpath)))
	dropdown.click()
	Select(dropdown).select_by_visible_text('All')

	alert('Getting table headers')
	header_row = table.find_element(By.TAG_NAME, 'thead').find_element(By.TAG_NAME, 'tr')
	header_cols = header_row.find_elements(By.TAG_NAME, 'th')
	for col in header_cols:
		headers.append(col.text)

	alert('Getting table body\n')
	body_rows = table.find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')
	for row in body_rows:
		cols = row.find_elements(By.TAG_NAME, 'td')
		row_data: dict = {}

		for index, col in enumerate(cols):
			col_key: str = headers[index]
			col_val: dict = col.text

			row_data[col_key] = col_val

		body.append(row_data)
		name_keys.append(row_data['Player'].replace(' ',''))

		count += 1
		print(f'[{count}/{len(body_rows)}]', row_data['Player'])
	
	driver.quit()
	return body, name_keys

###############################################################################
# FUNCS FOR FILTERING RAW TABLE DATA

# Filter raw stat data + return obj as name:stat_obj
def filter_stat(rstat: dict) -> dict:
	name_key = rstat['Player'].replace(' ','')

	ftsy_pts = (
		float(rstat['PTS']) + 
		float(rstat['REB'])*1.2 + 
		float(rstat['AST'])*1.5 + 
		float(rstat['STL'])*3.0 + 
		float(rstat['BLK'])*3.0 - 
		float(rstat['TOV'])
	)

	return {
		name_key: {
			'name': rstat['Player'],
			'fantasyPpg': round(ftsy_pts, 2),
			'ppg': float(rstat['PTS']),
			'apg': float(rstat['AST']),
			'rpg': float(rstat['REB']),
			'fgPct': float(rstat['FG%']),
			'fg3Pct': float(rstat['3P%']),
			'ftPct': float(rstat['FT%']),
			'spg': float(rstat['STL']),
			'bpg': float(rstat['BLK']),
			'tpg': float(rstat['TOV']),
			'mpg': float(rstat['Min']),
			'age': int(rstat['Age'])
		}
	}

# Filter raw bio data + return obj as name:bio_obj
def filter_bio(rbio: dict) -> dict:
	name_key = rbio['Player'].replace(' ','')
	return {
		name_key: {
			'team': rbio['Team'],
			'position': rbio['Position'],
			'height': rbio['Height'],
			'weight': rbio['Weight'],
			'lastAttended': rbio['Last Attended'],
			'country': rbio['Country']
		}
	}

# Return obj holding all stats/bios respectively, post-filter
def filter_stats_and_bios(raw_stats: list[dict], raw_bios: list[dict]) -> list[dict, dict]:
	stats = {}
	bios = {}

	for rstat in raw_stats:
		name, stat = list(filter_stat(rstat).items())[0]
		stats[name] = stat
	for rbio in raw_bios:
		name, bio = list(filter_bio(rbio).items())[0]
		bios[name] = bio

	return stats, bios

# Join stat/bio data by the passed name_key and return as obj
def player_card(stats: dict, bios: dict, name_key: list[str]) -> dict:
	card: dict = {}
	stat: dict = stats[name_key]
	bio: dict = bios[name_key]

	for key, val in stat.items():
		card[key] = val
	for key, val in bio.items():
		card[key] = val

	return card

###############################################################################
# FUNCS FOR WRITING/READING FILES

# Write arr to csv file
def arr_to_csv(arr: list, csv_file_path: str):
	with open(csv_file_path, 'w', newline='') as file:
		writer = csv.writer(file)
		writer.writerow(arr)

# Get arr from csv file
def arr_from_csv(csv_file_path: str) -> list[str]:
	arr: list = []
	with open(csv_file_path, 'r') as file:
		reader = csv.reader(file)
		for row in reader:
			arr.extend(row)
	return arr

# Write obj to json file (by converting obj to arr)
def dict_to_json(dict: dict, json_file_path: str):
	with open(json_file_path, 'w') as file:
		json.dump(list({ key: val } for key, val in dict.items()), file, indent=4)

# Get obj from json file
def dict_from_json(json_file_path: str) -> dict:
	dict = {}
	with open(json_file_path, 'r') as file:
		temp_arr = json.load(file)
	for dic in temp_arr:
		key,val = list(dic.items())[0]
		dict[key] = val
	return dict
