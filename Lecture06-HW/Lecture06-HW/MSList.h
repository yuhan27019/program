#ifndef MSLIST_H
#define MSLIST_H

#include "star.hpp"

class MSList {
private:
    static const int MAX_STARS = 300;
    Star stars[MAX_STARS];
    int numStars;

public:
    MSList();
    void updateStars(float moveFactorX, float moveFactorY, float R, float G, float B);
    void drawStars() const;
};

#endif // MSLIST_H
