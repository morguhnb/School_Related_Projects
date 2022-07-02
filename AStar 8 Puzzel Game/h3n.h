#ifndef H3N_H
#define H3N_H

#include <iostream>
#include "Sn.h"

using namespace std;

//h3n is the sum of the boards h4n value multiplied by 2, and it's Sn value
//h4n:is the sum of the numbr of tiles out of row, + the number of tiles out of column: see h4n.h
//Sn: Sequence Score from tiles away from their propper successor: see Sn.h

int h3n(int board[3][3], int h4nVal){
  int SnVal = Sn(board);
  int h3nVal = (2*h4nVal) + SnVal;
  return h3nVal;
}

#endif