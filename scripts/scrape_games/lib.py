from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

###############################################################################
# CONSTANTS

GREEN = '\033[92m'
YELLOW = '\033[93m'
RED = '\033[91m'
RESET = '\033[0m'

# xpath: div that encapsulates every week schedule
SCHEDULE_PARENT_DIV_XPATH = '/html/body/div[1]/div[2]/div[2]/main/div[2]/section/div/div[3]'

# xpath: button to show more weeks
LOAD_MORE_BUTTON_XPATH = '/html/body/div[1]/div[2]/div[2]/main/div[2]/div/button'

TIMEOUT = 10

###############################################################################
# PRINT MESSAGES

def alert(msg):
	print(YELLOW + msg + RESET)

def success(msg):
	print(GREEN + msg + RESET)

def fail(msg):
	print(RED + msg + RESET)

###############################################################################
# PARSE FUNCS

def keep_loading_more(DRIVER: webdriver):
	# define timeout obj
	wait = WebDriverWait(DRIVER, TIMEOUT)

	# get "Load More button"
	try:
		alert('Waiting for "Load More" button to become visible')
		load_more_button = wait.until(EC.element_to_be_clickable((By.XPATH, LOAD_MORE_BUTTON_XPATH)))
	except Exception as err:
		fail('Error: Could not find "Load More" button')
		print(err)
		exit(1)

	# scroll into "Load More" button view
	try: 
		alert('Scrolling into button view')
		DRIVER.execute_script("arguments[0].scrollIntoView();", load_more_button)
	except Exception as err:
		fail('Error: Could not scroll into button view')
		print(err)
		exit(1)

	# keep clicking "Load More" until exhausted
	try:
		while load_more_button != None:
			alert('Clicking "Load More" button')
			load_more_button.click()
	except:
		alert('"Load More" button click exhausted')

def parse_schedule_weeks(DRIVER: webdriver):
	data = []

	# wait = WebDriverWait(DRIVER, TIMEOUT)

	parent_elem = DRIVER.find_element(By.CLASS_NAME, "Block_blockContent__6iJ_n")
	parent_elem = parent_elem.find_elements(By.XPATH, "./*")[2]
	weeks = parent_elem.find_elements(By.XPATH, "./*")

	alert("Getting weeks:")
	for wk_num, week in enumerate(weeks):
		alert(f"\tWeek: {wk_num+1}")
		# ignore "ScheduleWeek_swHeader_..." header elem
		days = week.find_elements(By.XPATH, "./*")[1:]

		alert("\n\tGetting days:")
		for day in days:
			day_children_elems = day.find_elements(By.XPATH, "./*")
			# process date
			date_elem = day_children_elems[0]
			date = date_elem.find_element(By.CLASS_NAME, "ScheduleDay_sdDay__3s2Xt").text

			games = day_children_elems[1].find_elements(By.XPATH, "./*")
			alert(f"\t\tDate: {date} ({len(games)} games)")

			# process games
			for game_num, game in enumerate(games):

				# access "content" div
				content = game.find_elements(By.XPATH, "./*")[0]
				status, matchup = content.find_elements(By.XPATH, "./*")

				# access status: time + broadcast info
				status_child_elems = status.find_elements(By.XPATH, "./*")

				time = ""
				broadcasters_img_src = ""
				away_team = ""
				home_team = ""

				# regular game
				if len(status_child_elems) == 2:
					time_elem, broadcasters_base = status_child_elems

					time = time_elem.text

					# broadcasters_sec = broadcasters_base.find_elements(By.CLASS_NAME, "Broadcasters_section__ISlyP")[0]
					# broadcasters_img = broadcasters_sec.find_element(By.CLASS_NAME, "Broadcasters_icon__82MTV")

					# access matchup: away vs home
					teams = matchup.find_elements(By.TAG_NAME, "div")
					away_team = teams[0].find_element(By.TAG_NAME, "a").text
					home_team = teams[1].find_element(By.TAG_NAME, "a").text

				# tbd?
				elif status_child_elems[0].text == "TBD":
					time = "TBD"
					away_team = "TBD"
					home_team = "TBD"

				success(f"\t\t\tGame ({game_num+1}/{len(games)}): { date, time, away_team, home_team }")

				data.append(game_data(date, time, away_team, home_team))

	return data

# convert data into correct db schema
def game_data(date: str, time: str, away_team: str, home_team: str):
	game: dict = {}
	game["day"] = date
	game["time"] = time
	game["awayTeam"] = away_team
	game["homeTeam"] = home_team
	return game