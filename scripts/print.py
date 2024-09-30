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
