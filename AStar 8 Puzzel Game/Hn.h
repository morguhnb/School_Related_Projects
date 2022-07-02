#ifndef HN_H
#define HN_H

#include <iostream>
#include "Sn.h"

using namespace std;
//Hn is the sum of the board's h2n value and Sn value multiplied by 3
//h2n: sum of tiles distances from goal positions: see h2n.h
//Sn: Sequence Score from tiles away from their propper successor: see Sn.h

int Hn(int board[3][3], int h2nVal){
  int SnVal = Sn(board);
  int HnVal = h2nVal + (3*SnVal);
  return HnVal;
}

#endif