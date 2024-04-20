#include "MSList.h"

MSList::MSList() : numStars(0) {}

void MSList::updateStars(float moveFactorX, float moveFactorY, float R, float G, float B) {
    if (numStars >= MAX_STARS) {
        // If max stars reached, do nothing
        return;
    }
    stars[numStars] = Star(moveFactorX, moveFactorY, 0.1f, R, G, B);
    numStars++;
}

void MSList::drawStars() const {
    for (int i = 0; i < numStars; ++i) {
        stars[i].draw();
    }
}

