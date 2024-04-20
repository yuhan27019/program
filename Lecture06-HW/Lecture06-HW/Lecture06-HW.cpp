#include <GLFW/glfw3.h>
#include <iostream>
#include <random>
#include "MSList.h"

#pragma comment(lib, "Opengl32.lib")

float moveFactorX = 0.0f;
float moveFactorY = 0.0f;
float R, G, B;

void errorCallback(int error, const char* description) {
    std::cerr << "GLFW Error: " << description << std::endl;
}

void updateMoveFactorY() {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_real_distribution<float> dis(-9.0f, 9.0f);
    moveFactorY = dis(gen);
}

void updateMoveFactorX() {
    std::random_device rd2;
    std::mt19937 gen2(rd2());
    std::uniform_real_distribution<float> dis2(-10.0f, 10.0f);
    moveFactorX = dis2(gen2);
}

void updateRGB() {
    std::random_device rdR;
    std::random_device rdG;
    std::random_device rdB;
    std::mt19937 genR(rdR());
    std::mt19937 genG(rdG());
    std::mt19937 genB(rdB());
    std::uniform_real_distribution<float> disR(0.0f, 255.0f);
    std::uniform_real_distribution<float> disG(0.0f, 255.0f);
    std::uniform_real_distribution<float> disB(0.0f, 255.0f);
    R = disR(genR);
    G = disG(genG);
    B = disB(genB);
}

int main() {
    if (!glfwInit())
        return -1;

    GLFWwindow* window;
    window = glfwCreateWindow(1280, 768, "MuSoeunEngine", NULL, NULL);

    if (!window) {
        glfwTerminate();
        return -1;
    }

    glfwMakeContextCurrent(window);
    glfwSetErrorCallback(errorCallback);

    MSList starList;

    while (!glfwWindowShouldClose(window)) {
        glfwPollEvents();
        glClearColor(1.0f, 0.0f, 1.0f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        updateMoveFactorY();
        updateMoveFactorX();
        updateRGB();

        starList.updateStars(moveFactorX, moveFactorY, R, G, B);
        starList.drawStars();

        glfwSwapBuffers(window);
    }

    glfwTerminate();
    return 0;
}
