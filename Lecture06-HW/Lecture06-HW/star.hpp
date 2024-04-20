#ifndef STAR_HPP
#define STAR_HPP

#include <GLFW/glfw3.h>

class Star {
private:
    float x;
    float y;
    float scaleFactor;
    float R, G, B;

public:
    // 기본 생성자 추가
    Star() : x(0), y(0), scaleFactor(1.0f), R(1.0f), G(1.0f), B(1.0f) {}

    Star(float x, float y, float scaleFactor, float R, float G, float B)
        : x(x), y(y), scaleFactor(scaleFactor), R(R), G(G), B(B) {}

    void draw() const {
        glBegin(GL_POLYGON);
        glColor3f(R, G, B);
        glVertex2f((0.0f + x) * scaleFactor, (-0.5f + y) * scaleFactor);
        glVertex2f((0.4f + x) * scaleFactor, (-0.9f + y) * scaleFactor);
        glVertex2f((0.3f + x) * scaleFactor, (-0.3f + y) * scaleFactor);
        glVertex2f((0.7f + x) * scaleFactor, (0.2f + y) * scaleFactor);
        glVertex2f((0.2f + x) * scaleFactor, (0.2f + y) * scaleFactor);
        glVertex2f((0.0f + x) * scaleFactor, (0.8f + y) * scaleFactor);
        glVertex2f((-0.2f + x) * scaleFactor, (0.2f + y) * scaleFactor);
        glVertex2f((-0.7f + x) * scaleFactor, (0.2f + y) * scaleFactor);
        glVertex2f((-0.2f + x) * scaleFactor, (0.2f + y) * scaleFactor);
        glVertex2f((-0.3f + x) * scaleFactor, (-0.3f + y) * scaleFactor);
        glVertex2f((-0.4f + x) * scaleFactor, (-0.9f + y) * scaleFactor);
        glEnd();
    }
};

#endif // STAR_HPP
