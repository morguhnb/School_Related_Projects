import random
import numpy as np


class Events:
    def __init__(self, player):
        self.player = player #which player owns this event
        self.actionCode = None
        self.arrivalTime = None
        
        self.depositAmt = 0 #Amount to add to chain
        self.withdrawlAmt = 0 #Dependent on amount of money in chain
        self.transferAmt = 0 #Amount to add to player
        self.transferTarget = None #Which player to transfer money to
        self.paymentMethod = '' #Accout or Credit for all actions but hold
        self.withdrawlTarget = None #Player withdrawls to credit or to account
        self.paymentAmt = 0 #For The Banks use, simplifies purchase handling
        self.minerTarget = None
        
    def getPaymentMethod():
        method = random.randint(1,2)
        if method == 1:
            return "Account"
        else:
            return "Credit"
    
    def getPlayerOrder(players): #Shuffles Deck of players
        random.shuffle(players)
        return players
        
    def rollActionCode(event):
        e = np.random.choice(["D", "W", "T", "H"], replace = False, p = [0.25, 0.25, 0.2, 0.3])
        if e == "D":
            return 0
        if e == "W":
            return 1
        if e == "T":
            return 2
        if e == "H":
            return 3
            
    def getPaymentAmt(event):
        amt = 0
        if event.paymentMethod == "Account":
            amt = random.randint(1, event.player.acctBal)
        if event.paymentMethod == "Credit":
            amt = random.randint(1, event.player.creditLimit)
        return amt
    
    def getWithdrawlAmt(player):
        if player.chainBalance == 0: #No money on the chain
            withdrawlAmt = 0
        else:
            withdrawlAmt = random.randint(1, 100000)
            
        return withdrawlAmt
    
    def getTransferTarget(currPlayer):    
        while True:
            target = random.choice(["A", "B", "C", "D"])
            if target != currPlayer.name:
                return target
    
    def getMinerTarget(minerList):
        miner = random.choice(minerList)
        name = miner.name
        
        return name