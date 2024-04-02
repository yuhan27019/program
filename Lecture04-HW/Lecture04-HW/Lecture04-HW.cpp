#pragma comment(lib, "Opengl32.lib")
#include <GLFW/glfw3.h>
#include <iostream>

double prevXPos = 0;
double prevYPos = 0;
bool leftMouseButtonPressed = false;
bool rightMouseButtonPressed = false;
double lastCursorPositionUpdateTime = 0;
double prevDeltaTime = 0;
bool mouseDragging = false;
double mouseDraggingTime = 0.0;

void errorCallback(int error, const char* description)
{
    std::cerr << "GLFW Error: " << description << std::endl;
}

void keyCallback(GLFWwindow* window, int key, int scancode, int action, int mods)
{
    if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS)
    {
        glfwSetWindowShouldClose(window, GLFW_TRUE);
    }
}

void mouseclick(GLFWwindow* window, int button, int action, int mods)
{
    if (button == GLFW_MOUSE_BUTTON_LEFT && action == GLFW_PRESS)
    {
        leftMouseButtonPressed = true;
        rightMouseButtonPressed = false;
        glClearColor(0, 1, 0, 1); // 초록색 배경
    }
    else if (button == GLFW_MOUSE_BUTTON_RIGHT && action == GLFW_PRESS)
    {
        rightMouseButtonPressed = true;
        leftMouseButtonPressed = false;
        glClearColor(1, 0, 0, 1); // 빨간색 배경
    }
    else {
        leftMouseButtonPressed = false;
        rightMouseButtonPressed = false;
        glClearColor(0.0f, 0.0f, 0.0f, 1.0f); // 검은색 배경
    }
}

void cursorPositionCallback(GLFWwindow* window, double xpos, double ypos)
{
    double currentTime = glfwGetTime();
    double deltaTime = currentTime - lastCursorPositionUpdateTime;

    // 마우스 커서 위치 갱신
    prevXPos = xpos;
    prevYPos = ypos;
    lastCursorPositionUpdateTime = currentTime;



    // 마우스 드래그 상태에 따라 배경색 설정
    if (leftMouseButtonPressed)
    {
        glClearColor(1.0f, 0.0f, 1.0f, 1.0f); // 마젠타색 배경
    }
    else if (rightMouseButtonPressed)
    {
        glClearColor(0.0f, 0.0f, 1.0f, 1.0f); // 파란색 배경
    }
    else {
        glClearColor(0.0f, 0.0f, 0.0f, 1.0f); // 검은색 배경
    }


}

void updateCursorPosition(GLFWwindow* window)
{
    double currentTime = glfwGetTime();
    double deltaTime = currentTime - lastCursorPositionUpdateTime;

    if (deltaTime > 1)
    {
        // 마우스 위치 출력
        double xpos, ypos;
        glfwGetCursorPos(window, &xpos, &ypos);
        std::cout << "Mouse position: (" << xpos << ", " << ypos << ")" << std::endl;

        // 이전 마우스 위치 갱신
        prevXPos = xpos;
        prevYPos = ypos;
        lastCursorPositionUpdateTime = currentTime;
        if (prevXPos == xpos && prevYPos == ypos)
        {
            glfwSetMouseButtonCallback(window, mouseclick);
        }
    }
}

int main(void)
{
    if (!glfwInit())
        return -1;

    GLFWwindow* window;
    window = glfwCreateWindow(1280, 768, "MuSoeunEngine", NULL, NULL);

    if (!window)
    {
        glfwTerminate();
        return -1;
    }

    glfwMakeContextCurrent(window);
    glfwSetErrorCallback(errorCallback);
    glfwSetKeyCallback(window, keyCallback);
    glfwSetMouseButtonCallback(window, mouseclick);
    glfwSetCursorPosCallback(window, cursorPositionCallback);

    while (!glfwWindowShouldClose(window))
    {
        glfwPollEvents();
        glClear(GL_COLOR_BUFFER_BIT);

        // 마우스 커서 위치 주기적으로 갱신
        updateCursorPosition(window);

        glfwSwapBuffers(window);
    }

    glfwTerminate();
    return 0;
}