
#include <GLFW/glfw3.h>
#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <cmath>
#pragma comment(lib, "opengl32.lib")

using namespace std;

// 플레이어 관련 변수
GLfloat playerX = 0.0f;
const GLfloat playerY = -0.8f;
const GLfloat playerSpeed = 0.1f;
int playerLives = 3; // 플레이어의 목숨 수

// 적 우주선 관련 변수
const GLfloat enemySpeed = 0.01f;
const float minEnemyCreationInterval = 0.5f;
const float maxEnemyCreationInterval = 1.5f;

struct Enemy {
    GLfloat x;
    GLfloat y;
};

vector<Enemy> enemies;

const GLfloat bulletSpeed = 0.02f;
const GLfloat bulletY = -0.8f;
vector<GLfloat> bulletsX;
vector<GLfloat> bulletsY; // 발사체의 y 좌표를 저장하는 벡터 추가

// 적 생성 타이머 변수
float enemyCreationTimer = 0.0f;
float enemyCreationInterval = 1.0f;

// 키 입력 처리 함수
void key_callback(GLFWwindow* window, int key, int scancode, int action, int mods) {
    if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS) {
        glfwSetWindowShouldClose(window, GLFW_TRUE);
    }

    // 좌우 화살표 키로 플레이어 이동
    if (key == GLFW_KEY_LEFT && (action == GLFW_PRESS || action == GLFW_REPEAT)) {
        playerX -= playerSpeed;
    }
    if (key == GLFW_KEY_RIGHT && (action == GLFW_PRESS || action == GLFW_REPEAT)) {
        playerX += playerSpeed;
    }

    // 스페이스 키로 발사체 발사
    if (key == GLFW_KEY_SPACE && action == GLFW_PRESS) {
        bulletsX.push_back(playerX); // 플레이어의 x 좌표를 발사체의 x 좌표로 설정
        bulletsY.push_back(playerY); // 플레이어의 y 좌표를 발사체의 y 좌표로 설정
    }
}

// 거리 계산 함수
float calculateDistance(float x1, float y1, float x2, float y2) {
    return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
void gameLoop(GLFWwindow* window) {
    while (!glfwWindowShouldClose(window)) {
        // 배경 그리기
        glClear(GL_COLOR_BUFFER_BIT);

        // 플레이어 그리기
        glBegin(GL_TRIANGLES);
        glColor3f(1.0f, 0.0f, 0.0f);
        glVertex2f(playerX, playerY);
        glVertex2f(playerX - 0.05f, playerY - 0.1f);
        glVertex2f(playerX + 0.05f, playerY - 0.1f);
        glEnd();

        // 적 우주선 그리기
        glBegin(GL_TRIANGLES);
        glColor3f(0.0f, 1.0f, 0.0f);
        for (const auto& enemy : enemies) {
            glVertex2f(enemy.x, enemy.y);
            glVertex2f(enemy.x - 0.05f, enemy.y + 0.1f);
            glVertex2f(enemy.x + 0.05f, enemy.y + 0.1f);
        }
        glEnd();

        // 발사체 그리기
        glBegin(GL_LINES);
        glColor3f(0.0f, 0.0f, 1.0f);
        for (int i = 0; i < bulletsX.size(); ++i) {
            glVertex2f(bulletsX[i], bulletsY[i]); // 발사체의 x, y 좌표 사용
            glVertex2f(bulletsX[i], bulletsY[i] + 0.05f);
        }
        glEnd();

        // 모든 그래픽 작업이 끝나면 버퍼 스왑
        glfwSwapBuffers(window);

        // 입력 이벤트 폴링
        glfwPollEvents();

        // 적 우주선 이동
        for (auto& enemy : enemies) {
            enemy.y -= enemySpeed;
            if (enemy.y < -1.0f) {
                enemy.x = (rand() % 800 - 400) / 400.0f; // 화면 중앙에서 랜덤한 위치로
                enemy.y = 1.2f; // 화면 상단에서 재생성
            }
        }

        // 발사체 이동
        for (int i = 0; i < bulletsX.size(); ++i) {
            bulletsY[i] += bulletSpeed; // 발사체의 y 좌표를 증가시켜 위로 이동
            if (bulletsY[i] > 1.0f) {
                bulletsY.erase(bulletsY.begin() + i);
                bulletsX.erase(bulletsX.begin() + i);
                --i;
            }
        }

        // 플레이어와 적의 충돌 확인 및 처리
        for (size_t i = 0; i < enemies.size(); ++i) {
            // 플레이어와 적의 충돌 확인
            if (calculateDistance(playerX, playerY, enemies[i].x, enemies[i].y) < 0.05f) {
                // 플레이어가 적에게 닿으면 목숨을 감소시키고, 적을 재생성한다.
                playerLives--; // 플레이어 목숨을 1 줄임
                // 적을 화면 상단에 재생성
                enemies[i].x = (rand() % 800 - 400) / 400.0f;
                enemies[i].y = 1.2f; // 화면 상단에서 재생성
            }

            // 발사체와 적의 충돌 확인
            for (size_t j = 0; j < bulletsX.size(); ++j) {
                if (calculateDistance(bulletsX[j], bulletsY[j], enemies[i].x, enemies[i].y) < 0.1f) {
                    // 발사체가 적에게 닿으면 적을 제거하고 발사체도 제거한다.
                    bulletsX.erase(bulletsX.begin() + j);
                    bulletsY.erase(bulletsY.begin() + j);
                    enemies.erase(enemies.begin() + i);
                    // 충돌이 발생하면 루프를 종료하고 다음 적을 검사한다.
                    break;
                }
            }
        }



        // 적 생성 타이머 업데이트
        enemyCreationTimer += 0.01f;
        if (enemyCreationTimer >= enemyCreationInterval) {
            GLfloat x = (rand() % 800 - 400) / 400.0f; // 화면 중앙에서 랜덤한 위치로
            GLfloat y = 1.0f; // 화면 상단에 생성
            enemies.push_back({ x, y });
            enemyCreationTimer = 0.0f;
            enemyCreationInterval = minEnemyCreationInterval + static_cast<float>(rand()) / RAND_MAX * (maxEnemyCreationInterval - minEnemyCreationInterval);
        }
    }
}

int main() {
    // GLFW 초기화
    if (!glfwInit()) {
        return -1;
    }

    // OpenGL 버전 및 프로필 설정
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 2);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);

    // 창 생성
    GLFWwindow* window = glfwCreateWindow(800, 600, "Galaga-like Game", NULL, NULL);
    if (!window) {
        glfwTerminate();
        return -1;
    }
    glfwMakeContextCurrent(window);

    // 키 입력 콜백 함수 등록
    glfwSetKeyCallback(window, key_callback);

    // 난수 발생기 시드 설정
    srand(static_cast<unsigned int>(time(NULL)));

    // 게임 루프 실행
    gameLoop(window);

    // GLFW 종료
    glfwTerminate();
    return 0;
}