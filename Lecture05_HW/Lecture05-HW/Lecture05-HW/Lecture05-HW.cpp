#include <GLFW/glfw3.h>

#include <iostream>

#pragma comment(lib, "Opengl32.lib")

float moveFactorX = 0.0f;
float moveFactorY = 0.0f;
float scaleFactor = 1.0f;

bool isclickleft = false;
bool isclickright = false;

double lastX = 0.0;
double lastY = 0.0;

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
	if (key == GLFW_KEY_SPACE && action == GLFW_PRESS)
	{
		moveFactorX += 0.01f;
	}
	if (key == GLFW_KEY_ENTER && action == GLFW_PRESS)
	{
		scaleFactor += 0.1f;
	}
}

void mouseclick(GLFWwindow* window, int button, int action, int mods)
{
	if (button == GLFW_MOUSE_BUTTON_LEFT && action == GLFW_PRESS)
	{
		isclickleft = true;
	}
	else if (button == GLFW_MOUSE_BUTTON_RIGHT && action == GLFW_PRESS) {
		isclickright = true;
	}
	else {

		isclickleft = false;
		isclickright = false;
	}


}

void mousecursor(GLFWwindow* window, double xpos, double ypos)
{
	// 현재 마우스 위치
	double currentX = xpos;
	double currentY = ypos;

	// 이전 마우스 위치와 현재 마우스 위치를 비교하여 이동량을 계산
	double deltaX = currentX - lastX;
	double deltaY = currentY - lastY;

	if (isclickleft)
	{
		if (deltaX > 0)
		{
			moveFactorX += 0.01f;
		}
		else if (deltaX < 0)
		{
			moveFactorX -= 0.01f;
		}
		if (deltaY > 0)
		{
			moveFactorY -= 0.01f;
		}
		else if (deltaY < 0) {
			moveFactorY += 0.01f;
		}

	}
	if (isclickright) {
		if (deltaX > 0) {
			scaleFactor += 0.1f;
		}
		else if (deltaX < 0 && !(scaleFactor <= 0)) {
			scaleFactor -= 0.1f;
		}
	}

	// 이전 위치 갱신
	lastX = currentX;
	lastY = currentY;

	std::cout << "마우스 이동량: (" << deltaX << ", " << deltaY << ")" << std::endl;
}


int render()
{
	glBegin(GL_POLYGON);

	glColor3f(1.0f, 1.0f, 1.0f);

	glVertex2f((0.0f + moveFactorX) * scaleFactor, (-0.5f + moveFactorY) * scaleFactor);
	glVertex2f((0.4f + moveFactorX) * scaleFactor, (-0.9f + moveFactorY) * scaleFactor);
	glVertex2f((0.3f + moveFactorX) * scaleFactor, (-0.3f + moveFactorY) * scaleFactor);

	glVertex2f((0.7f + moveFactorX) * scaleFactor, (0.2f + moveFactorY) * scaleFactor);
	glVertex2f((0.2f + moveFactorX) * scaleFactor, (0.2f + moveFactorY) * scaleFactor);

	glVertex2f((0.0f + moveFactorX) * scaleFactor, (0.8f + moveFactorY) * scaleFactor);
	glVertex2f((-0.2f + moveFactorX) * scaleFactor, (0.2f + moveFactorY) * scaleFactor);

	glVertex2f((-0.7f + moveFactorX) * scaleFactor, (0.2f + moveFactorY) * scaleFactor);
	glVertex2f((-0.2f + moveFactorX) * scaleFactor, (0.2f + moveFactorY) * scaleFactor);

	glVertex2f((-0.3f + moveFactorX) * scaleFactor, (-0.3f + moveFactorY) * scaleFactor);
	glVertex2f((-0.4f + moveFactorX) * scaleFactor, (-0.9f + moveFactorY) * scaleFactor);



	glEnd();

	return 0;
}

int main()
{
	//glfw라이브러리 초기화
	if (!glfwInit())
		return -1;

	GLFWwindow* window;
	window = glfwCreateWindow(1280, 768, "MuSoeunEngine", NULL, NULL);

	if (!window)
	{
		glfwTerminate();
		return -1;
	}

	/* Make the window's context current */
	glfwMakeContextCurrent(window);
	glfwSetErrorCallback(errorCallback);
	glfwSetKeyCallback(window, keyCallback);
	glfwSetCursorPosCallback(window, mousecursor);
	glfwSetMouseButtonCallback(window, mouseclick);


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

