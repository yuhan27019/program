#pragma comment(lib, "Opengl32.lib")
#include <GLFW/glfw3.h>
#include <iostream>
#include <cmath>


void errorCallback(int error, const char* description)
{
	std::cerr << "GLFW Error: " << description << std::endl;
}



int setVertexRotation(float x, float y, float angle_degree, float moveFactorX, float moveFactorY, float scaleFactor)
{
	float M_PI = 3.14;
	float angle = angle_degree / 180 * M_PI;

	glVertex2f((x * cos(angle) - (y * sin(angle)) + moveFactorX) * scaleFactor, (x * sin(angle) + (y * cos(angle) + moveFactorY)) * scaleFactor);
	return 0;
}



float angle = 0;
float starangle = 0;
float earthangle = 0;
float moonangle = 0;
float rotationAngle = 0;

void drawplant(float x, float y, float red, float green, float blue, float moveX, float moveY, float scale, float degree) {
	glBegin(GL_TRIANGLE_FAN);
	glColor3f(red, green, blue); // 색상 지정

	// 육각형 그리기
	setVertexRotation(0.0f, 0.0f, 0, moveX, moveY, scale);
	for (int i = 0; i < 360; i = i + degree) {
		setVertexRotation(x, y, i + angle, moveX, moveY, scale);
	}
	setVertexRotation(x, y, angle, moveX, moveY, scale);

	glEnd();


	glLineWidth(2.0f);

	glBegin(GL_LINE_LOOP);
	glColor3f(0.0f, 0.0f, 0.0f); // 선 색상 지정

	for (int i = 0; i < 360; i += degree) {
		setVertexRotation(x, y, i + angle, moveX, moveY, scale);
	}

	glEnd();
	angle += 0.9; // 각도 업데이트
}

void drawstar(float x, float y, float red, float green, float blue, float moveX, float moveY, float scale, float degree) {
	glBegin(GL_TRIANGLE_FAN);
	glColor3f(red, green, blue); // 색상 지정

	// 육각형 그리기
	setVertexRotation(0.0f, 0.0f, 0, moveX, moveY, scale);
	for (int i = 0; i < 360; i = i + degree) {
		setVertexRotation(x, y, i + starangle, moveX, moveY, scale);
		setVertexRotation(x / 2, y, i + starangle + 36, moveX, moveY, scale);
	}
	setVertexRotation(x, y, starangle, moveX, moveY, scale);

	glEnd();
	starangle += 3; // 각도 업데이트

	glLineWidth(2.0f);

	glBegin(GL_LINES);
	glColor3f(0.0f, 0.0f, 0.0f);



	for (int i = 0; i < 360; i = i + degree)
	{
		setVertexRotation(x / 2, y, i + starangle - 36, moveX, moveY, scale);
		setVertexRotation(x, y, i + starangle, moveX, moveY, scale);


		setVertexRotation(x, y, i + starangle, moveX, moveY, scale);
		setVertexRotation(x / 2, y, i + starangle + 36, moveX, moveY, scale);
	}

	glEnd();
}

void sun()
{
	// 원 그리기
	float color[] = { 255.0f / 255.0f, 217.0f / 255.0f, 102.0f / 255.0f }; // 색상을 배열로 저장
	glColor3fv(color);
	float radius = 0.4f;
	int segments = 100;
	glBegin(GL_TRIANGLE_FAN);
	glVertex2f(0.0f, 0.0f);
	for (int i = 0; i <= segments; i++) {
		float angle = 2.0f * 3.14159265359f * i / segments;
		float x = radius * cosf(angle);
		float y = radius * sinf(angle);
		glVertex2f(x, y);
	}
	glEnd();
	// 윤곽선 그리기
	glLineWidth(3.0f); // 윤곽선의 너비 설정
	glColor3ub(197, 90, 17); // 윤곽선의 RGB 색상 설정
	glBegin(GL_LINE_LOOP);
	for (int i = 0; i <= segments; i++) {
		float angle = 2.0f * 3.14159265359f * i / segments;
		float x = radius * cosf(angle);
		float y = radius * sinf(angle);
		glVertex2f(x, y);
	}
	glEnd();

	// 원 안에 작은 원 그리기 (무늬)
	float smallerCircleColor[] = { 255.0f / 255.0f, 230.0f / 255.0f, 153.0f / 255.0f }; // 작은 원의 색상
	glColor3fv(smallerCircleColor);
	float smallerRadius = 0.15f; // 작은 원의 반지름
	int smallerSegments = 50;
	glBegin(GL_TRIANGLE_FAN);
	glVertex2f(0.0f, 0.0f); // 작은 원의 중심은 태양의 중심과 같음
	for (int i = 0; i <= smallerSegments; i++) {
		float angle = 2.0f * 3.14159265359f * i / smallerSegments;
		float x = smallerRadius * cosf(angle);
		float y = smallerRadius * sinf(angle);
		glVertex2f(x - 0.16f, y);
	}
	glEnd();

	// 작은 타원 그리기
	float ellipseColor[] = { 255.0f / 255.0f, 192.0f / 255.0f, 0.0f }; // 타원의 색상
	glColor3fv(ellipseColor);
	float ellipseRadiusX = 0.1f; // 타원의 X 반지름
	float ellipseRadiusY = 0.03f; // 타원의 Y 반지름
	int ellipseSegments = 100;
	glPushMatrix(); // 현재 변환 매트릭스를 스택에 저장
	glRotatef(45.0f, 0.0f, 0.0f, 1.0f); // z축 주변으로 45도 회전
	glTranslatef(0.0f, -0.37f, 0.0f); // 회전 후의 위치 조정
	glBegin(GL_POLYGON);
	for (int i = 0; i <= ellipseSegments; i++) {
		float angle = 2.0f * 3.14159265359f * i / ellipseSegments;
		float x = ellipseRadiusX * cosf(angle);
		float y = ellipseRadiusY * sinf(angle);
		glVertex2f(x, y);
	}
	glEnd();
	glPopMatrix(); // 이전 변환 매트릭스로 복원
}

void sunrotate() {
	// 회전 각도를 증가시킵니다.
	rotationAngle += 1.0f; // 예를 들어 1도씩 회전하도록 설정합니다.


	// 태양과 무늬를 회전시킵니다.
	glPushMatrix();
	glRotatef(rotationAngle, 0.0f, 0.0f, 1.0f); // z축 주변으로 회전
	sun();
	glPopMatrix();
}

void earthrevolution()
{
	// 태양의 위치
	float sunX = 0.0f;
	float sunY = 0.0f;

	// 지구의 위치 계산
	float earthOrbitRadius = 15.0f; // 지구의 태양 주위 공전 반지름
	float earthX = sunX + earthOrbitRadius * cos(earthangle);
	float earthY = sunY + earthOrbitRadius * sin(earthangle);

	// 지구가 회전하는 각도 업데이트
	earthangle += 0.006f; // 회전 속도 조절

	// 지구를 그리는 함수 호출
	drawplant(1.0f, 0.0f, 0.0f, 155.0f, 213.0f, earthX, earthY, 0.05f, 90); // 지구 그리기

	float moonOrbitRadius = 5.0f;

	float moonx = earthX + moonOrbitRadius * cos(moonangle);
	float moonY = earthY + moonOrbitRadius * sin(moonangle);

	moonangle -= 0.03f;

	drawstar(1.0f, 0.0f, 255.0f, 242.0f, 0.0f, moonx, moonY, 0.05f, 72); //달 그리기
}

int render() {
	sunrotate();


	earthrevolution();

	return 0;
}




int main(void)
{
	//glfw라이브러리 초기화
	if (!glfwInit())
		return -1;

	GLFWwindow* window;
	window = glfwCreateWindow(800, 800, "MuSoeunEngine", NULL, NULL);

	if (!window)
	{
		glfwTerminate();
		return -1;
	}

	/* Make the window's context current */
	glfwMakeContextCurrent(window);
	glfwSetErrorCallback(errorCallback);

	while (!glfwWindowShouldClose(window))
	{
		glfwPollEvents();
		glClearColor(1.0f, 0.0f, 1.0f, 1.0f);
		glClear(GL_COLOR_BUFFER_BIT);

		render();

		glfwSwapBuffers(window);
	}

	glfwTerminate();
	return 0;

}