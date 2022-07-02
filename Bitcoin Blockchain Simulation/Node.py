import csv

class Node:
    def __init__(self, data):
        self.next = None
        self.data = data
        
    def getData(self):
        return self.data
    def getNext(self):
        return self.next
    def setData(self, newData):
        self.data = newData
    def setNext(self, newNext):
        self.next = newNext

    def buildLinkedList(nodeData):  
        head = Node(nodeData[0])
        for i in range(1, len(nodeData)):
            newNode = Node(nodeData[i])
            if i == 1:
                head.next = newNode
                currNode = head.next
            else:
                currNode.next = newNode
                currNode = newNode
                
        return head

    def printLinkedList(head):
        currNode = head
        while currNode != None:
            print(currNode.data)
            currNode = currNode.next
            
    def LinkedListCSV(head):
        f= open("Blockchain_Golden_Ledger.csv", 'w')
        write = csv.writer(f)
        currNode = head
        while currNode != None:
            write.writerow(currNode.data)
            currNode = currNode.next
        f.close()