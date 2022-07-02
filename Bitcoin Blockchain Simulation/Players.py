import random
import numpy as np

class Players():
    def __init__(self, name, eventLimit, acctBal, creditLimit):
        self.name = name
        self. eventLimit = eventLimit
        self.acctBal = acctBal
        self.creditLimit = creditLimit
        self.creditBalance = 0 #Amount of credit already used
        self.chainBalance =  random.randint(0, 10000000)#The amount of money they have on the chain
        self.role = "Player"
        
        self.event = None

        self.pD = 0.25 #Probability of making a deposit
        self.pW = 0.25 #Probability of making a withdrawl
        self.pT = 0.2 #Probability of making a Transfer
        self.pH = 0.3 #Probability of holding (Not taking any actions)
                
        self.approvedCnt = 0 #Number of actions approved / denied
        self.deniedCnt = 0
        
        self.depositAmt = 0 #Amount to add to chain
        self.withdrawlAmt = 0 #Dependent on amount of money in chain
        self.transferAmt = 0 #Amount to add to player
        self.transferTarget = None #Which player to transfer money to
        self.paymentMethod = '' #Accout or Credit for all actions but hold
        self.withdrawlTarget = None #Player withdrawls to credit or to account
        self.paymentAmt = 0 #For The Banks use, simplifies purchase handling
        self.minerTarget = None

    def getEventLimit():
        eventLimit = random.randint(5000, 10000)
        return eventLimit
    
    def getAcctBal():
        acctBal = random.randint(100000,10000000) #Account balance from 10,000 - 10mil
        return acctBal
    
    def getCreditLim(acctBal): #Credit limit is derived from a percentage of the accout balance
        acctPercentage = random.uniform(0.1, 0.9)
        acctPercentage = int(acctPercentage * acctBal)
        creditLim = random.randint(0, acctPercentage)
        return creditLim
                    
    def printPlayerInfo(order): 
        print("____________PLAYER INFO____________")
        
        for i in range(len(order)):
            currPlayer = order[i]
            print(currPlayer.name)
            print("Player Info")            
            print("Account Balance: " + str(currPlayer.acctBal))            
            print("Credit Limit: " + str(currPlayer.creditLimit))            
            print("Credit Balance " + str(currPlayer.creditBalance))
            print("Probabilities")
            print("Deposit: " + str(currPlayer.pD))            
            print("Withdrawl: " + str(currPlayer.pW))            
            print("Transfer: " + str(currPlayer.pT))            
            print("Hold: " + str(currPlayer.pH))
            if currPlayer.approvedCnt > 0 and currPlayer.deniedCnt > 0:            
                print("Statistics:")
                print("Total transactions: " + str(currPlayer.approvedCnt + currPlayer.deniedCnt))
                print("Approved Transactions: " + str(currPlayer.approvedCnt))
                print("Denied Transactions Transactions: " + str(currPlayer.deniedCnt))
                approval = (currPlayer.approvedCnt / (currPlayer.approvedCnt + currPlayer.deniedCnt)) * 100
                denied = (currPlayer.deniedCnt / (currPlayer.approvedCnt + currPlayer.deniedCnt)) * 100
                approval = round(approval, 2)
                denied = round(denied, 2)
                print("Approval Percentage: " + str(approval) + "%")
                print("Denial Percentage: " + str(denied) + "%")
            
            print("-----")
        print("___________________________________")