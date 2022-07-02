#include <iostream>
#include <vector>
#include <iomanip>
#include <string>
#include <chrono> 
#include "Node.h" //Node Objects
#include "h2n.h" //Heuristics 
#include "h1n.h" 
#include "Hn.h"  
#include "Sn.h" 

using namespace std;

void printBoard(int[3][3]);
void possibleMoves(Node*, int); //Possible moves based off f values
//void setHeuristic(Node*); 
void makeBoard(int, int, int, int, Node*, int);
bool checkGoalState(int[3][3], int[3][3]);
bool compareBoards(int[3][3], int[3][3]);
Node* findLowestF(); // Lowest f values for A_Star function
void remove(Node*); // Remove node from OPEN nodes
bool onOPEN(Node*); // Check for variable on OPEN
bool onCLOSED(Node*); // Check for variable on CLOSED
int getIndex(Node*, vector<Node*>);
void printValues(int);
int A_STAR(Node*, int); // A* Algorithm

static vector<Node*> OPEN; // OPEN list: Nodes we are currently visiting
static vector<Node*> CLOSED; // CLOSED list: Nodes we have already visited
static int NG = 0; //Nodes Generated
static int NE = 0; //Nodes Expanded
static int D = 0; //Depth (g(n))
static int ET = 0; //Execution Time
static int BF = 0; //Branching Factor (Nodes Generated / Depth)


/* Board Goal State
   _____________
   | 1 | 2 | 3 |
   | 8 |   | 4 |
   | 7 | 6 | 5 |
   -------------
*/

int main() {

  int heuristic_choice; // Set Heuristic choice based on cin input
  string ready;
  
  cout << "Welcome to our 8-puzzle game!" << endl << endl;
  cout << "Please select a heuristic to run" << endl;
  cout << "1. h1n" << endl;
  cout << "2. h2n" << endl;
  cout << "3. Hn" << endl;
  cout << "4. Sn" << endl;
  cout << "5. h3n" << endl;
  cout << "6. h4n" << endl << endl;

  cin >> heuristic_choice;
  
  cout<<"Starting game!"<<endl << endl;

  //boards
  int initial_board_1[3][3]= {{2, 8, 3}, {1, 6, 4}, {0, 7, 5}};
  int initial_board_2[3][3]= {{2, 1, 6}, {4, 0, 8}, {7, 5, 3}};
  
  Node* board1;
  Node* board2;
  board1 =  new Node();
  board2 =  new Node();

  //creating boards (Node objects)
  populate_board(board1, initial_board_1); // Input values for Board #1
  populate_board(board2, initial_board_2); // Input values for Board #2

  //Run Board 1
  auto start1 = chrono::steady_clock::now();
  A_STAR(board1, heuristic_choice);
  auto end1 = chrono::steady_clock::now();
  ET = chrono::duration_cast<chrono::milliseconds>(end1 - start1).count();
  cout << "Execution Time in milliseconds: "<<ET<< " ms" <<endl;

  //Clear system information before second run
  OPEN.clear();
  CLOSED.clear();
  NG = 0;
  NE = 0;
  D = 0;
  
  cout<<"Press any key to begin the second board."<<endl;
  cin >> ready;

  ///Run Board 2
  auto start2 = chrono::steady_clock::now();
  A_STAR(board2, heuristic_choice);
  auto end2 = chrono::steady_clock::now();
  ET = chrono::duration_cast<chrono::milliseconds>(end2 - start2).count();
  cout << "Execution Time in milliseconds: "<<ET<< " ms" <<endl;

  return 0;
}

int A_STAR(Node* board, int heuristic_choice){
int goal_state[3][3] = {{1, 2, 3}, {8, 0, 4}, {7, 6, 5}}; // Goal State for both boards
  
  //Adding new Node
  Node* BESTNODE; 
  Node* OLD;
  Node* SUCCESSOR;
 
  setHeuristic(board, heuristic_choice);
  OPEN.push_back(board);
  cout<<"Initializing Board:"<<endl;
  printBoard(board->board_state);
  cout<<"_-----^^^^^-----_"<<endl;
  possibleMoves(board, heuristic_choice);
  NE += 1; //Every time the possible moves for a node are generated, we have expanded a node
  
  ///////////Start A*
  
  BESTNODE = board;
  while(compareBoards(BESTNODE->board_state, goal_state) == false){ //While we arent the goal state
    if(OPEN.size() == 0){  //If there are no nodes in open, program ends
      cout<<"failure"<<endl;
      exit(0);
    }
    
    // While the open list is NOT empty
    BESTNODE = findLowestF(); // BESTNODE is equal to lowest f values
    remove(BESTNODE); // Remove BESTNODE from open
    CLOSED.push_back(BESTNODE); // Push BESTNODE to CLOSE
    
    //generate the successors of BESTNODE and set their parent to BESTNODE
    possibleMoves(BESTNODE, heuristic_choice);
    NE += 1;
    cout<<endl;
    printBoard(BESTNODE->board_state); //current board we are at
    cout<<endl;
    for(int i = 0; i < OPEN.size(); i++){ //CHECKING IF ANY BOARD IS GOAL STATE
      if(compareBoards(OPEN[i]->board_state, goal_state) == true){
        cout<<"Goal State Found"<<endl;
        BESTNODE = OPEN[i];
        printBoard(BESTNODE->board_state);
        D = BESTNODE->depth;
        printValues(heuristic_choice);
        return -1;
      }
    }
    
    SUCCESSOR = findLowestF(); //Get SUCCESSOR to BESTNODE
    BESTNODE = SUCCESSOR;      // Set BESTNODE to point to SUCCESSOR
    SUCCESSOR->depth = BESTNODE->depth + SUCCESSOR->f; //Update G(successor) and f(successor) 

    //See if SUCCESSOR is same as any node on open
    if(onOPEN(SUCCESSOR)){
        int i = getIndex(SUCCESSOR, OPEN);
        OLD = OPEN[i];
        BESTNODE->successors.push_back(OLD); //The OLD node can be used to update a cheaper path
    }
      
    //If old(g) is cheaper, do nothing
    //if successor(g) is cheaper: 
    if(SUCCESSOR->depth < OLD->depth){
      OLD->parent = BESTNODE; //Reset old parent link to BESTNODE if SUCCESSOR is cheaper than OLD
      remove(SUCCESSOR);
      OLD->f = OLD->hVal + OLD->depth; //Update OLD f(n)
      BESTNODE->successors.push_back(OLD);
    } 

    //If not on OPEN, check if on CLOSED
    if(!onOPEN(SUCCESSOR)){ //See if it is any node on closed
      if(onCLOSED(SUCCESSOR)){
        int i = getIndex(SUCCESSOR, CLOSED);
        OLD = CLOSED[i];
        BESTNODE->successors.push_back(OLD);

        OLD->parent = BESTNODE; //Reset old parent link to BESTNODE if SUCCESSOR is cheaper than OLD
        OLD->f = OLD->hVal + OLD->depth;
        OPEN.push_back(SUCCESSOR);
      }
    }

    //If a cheaper path to old has been found, redo pointers
    if(!onOPEN(SUCCESSOR) && !onCLOSED(SUCCESSOR)){ // if SUCCESSOR is not on OPEN or CLOSED
    SUCCESSOR = BESTNODE;
    OPEN.push_back(BESTNODE); 
    }
  }
 return 0;   
}

//////////////Supporting Functions//////////////////////

// See board progression
void printBoard(int board[3][3]){ 
  for(int i = 0; i < 3; i++){
    for(int j = 0; j < 3; j++){
      if(board[i][j] == 0)
        cout<<" ";
      else
        cout << board[i][j];
    }
    cout << endl;
  }
}

// Check if SUCCESSOR is on OPEN
bool onOPEN(Node* SUCCESSOR){ 
  for(int i = 0; i < OPEN.size(); i++){
      if(compareBoards(OPEN[i]->board_state, SUCCESSOR->board_state) == true){
        return true;
      }
    }
  return false;
}

// Check if SUCCESSOR is on CLOSED
bool onCLOSED(Node* SUCCESSOR){ 
  for(int i = 0; i < CLOSED.size(); i++){
      if(compareBoards(CLOSED[i]->board_state, SUCCESSOR->board_state) == true){
        return true;
      }
    }
  return false;
}

// Get the index of the Node needed
int getIndex(Node* node, vector<Node*>LIST){ 
  int i;
  for(i = 0; i < LIST.size(); i++){
      if(compareBoards(LIST[i]->board_state, node->board_state) == true){
        break;   
      }
    }
  return i;
}


void possibleMoves(Node *currNode, int heuristic_choice){
  //x and y positions for zero, and value to be swapped
  int zeroX;
  int zeroY;
  int swapX;
  int swapY;
    
  //this vector is n * n: its the coordinates of every value that needs to be swapped.
  //note the size of swapCords is also how many new boards we make
  vector<vector<int>> swapCords;

  //Look for zero
  for(int i = 0; i < 3; i++){
    for(int j = 0; j < 3; j++){
      if(currNode->board_state[i][j] == 0){
        zeroX = i;
        zeroY = j;
        break;
      }
    }
  }
  
  //based on 0's position, determine squares around it
  //top left
  if(zeroX == 0 && zeroY==0){
    currNode->possibleMoves = 2; //left and down
    //set swap positions
    swapCords = {{1, 0}, {0, 1}};
  }
  //top middle
  if(zeroX == 0 && zeroY==1){
    currNode->possibleMoves = 3; //left and down
    swapCords = {{0, 0}, {0, 2}, {1, 1}};
  }
  //top right
  if(zeroX == 0 && zeroY==2){
    currNode->possibleMoves = 2; 
    swapCords = {{0, 1}, {1, 2}};
  }
  //middle left
  if(zeroX == 1 && zeroY==0){
    currNode->possibleMoves = 3; 
    swapCords = {{0, 0}, {2, 0}, {1, 1}};
  }
  //center
  if(zeroX == 1 && zeroY==1){
    currNode->possibleMoves = 4;
    swapCords = {{0, 1}, {1, 2}, {2, 1}, {1, 0}}; 
  }
  //middle right
  if(zeroX == 1 && zeroY==2){
    currNode->possibleMoves = 3; 
    swapCords = {{0, 2}, {1, 1}, {2, 2}};
  }
  //bottom left
  if(zeroX == 2 && zeroY==0){
    currNode->possibleMoves = 2; 
    swapCords = {{1, 0}, {2, 1}};
  }
  //bottom middle
  if(zeroX == 2 && zeroY==1){
    currNode->possibleMoves = 3; 
    swapCords = {{2, 0}, {1, 1}, {2, 2}};
  }
  //bottom right
  if(zeroX == 2 && zeroY==2){
    currNode->possibleMoves = 2; 
    swapCords = {{2, 1}, {1, 2}};
  }

  //make a new board (Node) for each sub array in swapCords
  for(int i = 0; i < swapCords.size(); i++){
    swapX = swapCords[i][0];
    swapY = swapCords[i][1];
    makeBoard(swapX, swapY, zeroX, zeroY, currNode, heuristic_choice);
  }
}

//making new board
void makeBoard(int swapX, int swapY, int zeroX, int zeroY, Node *currNode, int heuristic_choice){
  int temp[2] = {0, 0};
  Node* newBoard;
  newBoard = new Node;
  int swapVal = currNode->board_state[swapX][swapY];

  for(int i = 0; i < 3; i++){
    for(int j = 0; j < 3; j++){
      if(i == zeroX && j == zeroY){ //At zero position, time to swap
        newBoard->board_state[i][j] = swapVal;
      }
      else if(i == swapX && j == swapY){ //At swap position, time to swap
        newBoard->board_state[i][j] = 0;
      }
      else
        newBoard->board_state[i][j] = currNode->board_state[i][j];
    }

    newBoard->parent = currNode; //Important!
    newBoard->depth = newBoard->parent->depth + 1;
    //gather heuristics and push to OPEN
    setHeuristic(newBoard, heuristic_choice);
    OPEN.push_back(newBoard);
    NG += 1; //Node generated for each isntance of newBoard
  }
}

// Checks if current state is Goal State
bool checkGoalState(int board[3][3], int goal[3][3]){
    for(int i = 0; i < 3; i++){
      for(int j = 0; j < 3; j++){
        if(board[i][j] != goal[i][j]){
          return false;
        }
      }
    }
    return true;
}

// Finds lowest f value to pass to A_Star function f(n) = h(n) + g(n)
Node* findLowestF(){ 
  int min = 100;
  Node* currNode;
  Node* lowestNode;
  for(int i = 0; i < OPEN.size(); i++){
    currNode = OPEN[i];
    if(currNode->parent == NULL){
      if(currNode->hVal <= min){
        min = currNode->hVal;
        lowestNode = currNode;
      }
    }
    if(currNode->parent != NULL){ // Condition to ensure currNode is pointing to parent due to specific A* conditions
      if(currNode->hVal <= min && compareBoards(lowestNode->board_state, currNode->parent->board_state)){ 
        min = currNode->hVal;
        lowestNode = currNode;
      }
    }
  }
  return lowestNode;  
}

// Remove said node from either OPEN or CLOSED list
void remove(Node* node){ 
  for(int i = 0; i < OPEN.size(); i++){
    if(compareBoards(node->board_state, OPEN[i]->board_state) == true)
      OPEN.erase(OPEN.begin()+i);
  }
}

// Checks board progression, determine of two boards are identical
//useful for determining if at goal position, or if a board state has already been found using a cheaper path
bool compareBoards(int board1[3][3], int board2[3][3]){ 
  for(int i = 0; i < 3; i++){
      for(int j = 0; j < 3; j++){
        if(board1[i][j] != board2[i][j]){
          return false;
        }
    }
  }
  return true;
}

// Print wanted statistics from Project description
void printValues(int heuristic_choice)  { 
  BF = (int)NG / D;
  string h = getHeuristic(heuristic_choice);
  string hString = getHeuristicString(heuristic_choice);

  cout << "\n\n" << setfill(' ');
  cout << "Table" << endl;
  cout << "--------------------------------------------" << endl;
  cout << setw(15) << "|Heuristic Function" << setw(1) << "|" << setw(5) << "NG" << setw(1) << "|" << setw(5) << "NE" << "|" << setw(5) <<  "D" << "|" << setw(5) << "b*" << "|" << endl;

  cout << "--------------------------------------------" << endl;
  
  cout << "|" << setw(11) << h << setw(8) << "|" << setw(5) << NG << setw(1) << "|" << setw(5) << NE << "|" << setw(5) <<  D << "|" << setw(5) << BF << "|" << endl;
  cout << "--------------------------------------------" << endl;
	
  cout << "Heuristic Explanation: " << hString << endl;
  cout << endl;
}