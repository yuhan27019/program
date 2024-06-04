#pragma comment(lib, "Opengl32.lib")

#include <GLFW/glfw3.h>
#include <iostream>

// 오류 콜백 함수
void errorCallback(int error, const char* description)
{
    std::cerr << "GLFW Error: " << description << std::endl;
}

// 직사각형을 그리는 함수
void drawRectangle(float x, float y, float width, float height)
{
    glBegin(GL_QUADS);
    glColor3f(0.0f, 0.0f, 1.0f);
    glVertex2f(x, y);
    glVertex2f(x + width, y);
    glVertex2f(x + width, y + height);
    glVertex2f(x, y + height);
    glEnd();
}

// 정사각형을 그리는 함수
void drawSquare(float x, float y, float size)
{
    glBegin(GL_QUADS);
    glColor3f(1.0f, 1.0f, 0.0f); // 노란색 설정
    glVertex2f(x, y);
    glVertex2f(x + size, y);
    glVertex2f(x + size, y + size);
    glVertex2f(x, y + size);
    glEnd();
}

// 충돌 감지 함수
bool checkCollision(float rectX, float rectY, float rectWidth, float rectHeight, float squareX, float squareY, float squareSize)
{ //checkCollision(moveX, moveY, 2.0f, 0.3f, playX, playY, size
    // 직사각형의 경계 상자
    float rectLeft = rectX;
    float rectRight = rectX + rectWidth;
    float rectTop = rectY + rectHeight;
    float rectBottom = rectY;

    // 정사각형의 경계 상자
    float squareLeft = squareX;
    float squareRight = squareX + squareSize;
    float squareTop = squareY + squareSize;
    float squareBottom = squareY;

    // 충돌 여부 확인
    return !(rectRight < squareLeft || rectLeft > squareRight || rectTop < squareBottom || rectBottom > squareTop);
}

int main(void)
{
    // glfw 라이브러리 초기화
    if (!glfwInit())
        return -1;

    GLFWwindow* window = glfwCreateWindow(800, 800, "program_week12", NULL, NULL);

    if (!window)
    {
        glfwTerminate();
        return -1;
    }

    // OpenGL 컨텍스트를 현재로 설정
    glfwMakeContextCurrent(window);
    glfwSetErrorCallback(errorCallback);

    // 초기 위치 설정
    float moveX = -1.0f;
    float moveY = -0.8f;

    // 초기 플레이어 위치 설정
    float playX = 0.0f; 
    float playY = -0.8f; 
    float size = 0.1f;  // 정사각형의 한 면의 길이
    float playgravit = 0.0098f;
    bool isground = false;
    bool isjump = false;
    bool check = true;
    float jumppower = 0.02f;
    float jumptime = 0.0f;



    // 메인 루프
    while (!glfwWindowShouldClose(window))
    {
        // 이벤트 폴링
        glfwPollEvents();

        // 배경 색상 설정
        glClearColor(0.53f, 0.81f, 0.92f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        // 키보드 입력 처리
        if (glfwGetKey(window, GLFW_KEY_LEFT) == GLFW_PRESS)
            playX -= 0.01f;
        if (glfwGetKey(window, GLFW_KEY_RIGHT) == GLFW_PRESS)
            playX += 0.01f;
        if (glfwGetKey(window, GLFW_KEY_SPACE) == GLFW_PRESS && isjump)
        {
            isground = false;
            isjump = false;
            playgravit = 0.0098f;
            jumppower = 0.05f;
        }
            

        
        // 직사각형 그리기
        drawRectangle(moveX, moveY, 2.0f, 0.3f); // 가로 2, 높이 0.0125 직사각형 (OpenGL 좌표 기준)

        // 정사각형 그리기
        drawSquare(playX, playY, size);

        if (check) //충돌 감지는 한 번만
        {
            // 충돌 감지
            if (checkCollision(moveX, moveY, 2.0f, 0.3f, playX, playY, size))
            {
                std::cout << "Collision detected!" << std::endl;
                isground = true;
                isjump = true;
                playgravit = 0;
                playY = moveY + 0.3f;
                jumppower = 0.0f;
                jumptime = 0.0f;
                check = false;
            }
        }
        
        
        float a = (jumppower)-(playgravit*jumptime);
        if (!isground)
        {
            playY = playY + a;
            std::cout << "a : " <<a<< std::endl;
            jumptime += 0.1f;
            check = true;
        }

      
        

        // 버퍼 교체
        glfwSwapBuffers(window);
    }

    glfwTerminate();
    return 0;
}
