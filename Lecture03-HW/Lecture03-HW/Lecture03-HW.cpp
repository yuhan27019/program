#include <iostream>
#include <bitset>
using namespace std;

enum ForeColour {
    Default = 0,
    Black = 30,
    Red = 31,
    Green = 32,
    Yellow = 33,
    Blue = 34,
    Magenta = 35,
    Cyan = 36,
    White = 37,
};

void drawsqure(int width, int height)
{
    for (int i = 0; i < height; ++i) {
        for (int j = 0; j < width; ++j) {
            // 모든 부분을 '*' 문자로 출력
            cout << "* ";
        }
        cout << std::endl;
    }
}

int main() {
    cout << "화면에 그림을 그리는 프로그램입니다.\n";
    cout << "학번: 202127019\n";
    cout << "이름: 김영민\n\n";

    int decimalNumber; //입력한 값

    while (true)
    {
        cout << "화면에 그릴 물체코드를 입력하세요 (1:White, 2:Red, 4: Green, 8: Yellow, 16: Cyan, 32: Magenta, 64: End)\n";
        cin >> decimalNumber;

        // 입력된 10진수를 2진수로 변환하여 bitset에 저장
        std::bitset<sizeof(int) * 4> binaryNumber(decimalNumber);

        // 변환된 2진수 출력
        std::cout << "Binary representation: " << binaryNumber << std::endl;

        // 해당 2진수 값이 1, 10, 100, 1000, 10000, 100000 일 때 출력
        if (binaryNumber.test(0)) {
            std::cout << "Binary value: 1" << std::endl;
            // 하양색으로 설정
            std::cout << "\x1b[0;37m";

            drawsqure(5, 5);

            // 색상을 기본값으로 변경
            std::cout << "\x1b[0m";
        }
        if (binaryNumber.test(1)) {
            std::cout << "Binary value: 10" << std::endl;
            // 빨간색으로 설정
            std::cout << "\x1b[0;31m";

            drawsqure(5, 5);

            // 색상을 기본값으로 변경
            std::cout << "\x1b[0m";
        }
        if (binaryNumber.test(2)) {
            std::cout << "Binary value: 100" << std::endl;
            // 초록색으로 설정
            std::cout << "\x1b[0;32m";

            drawsqure(5, 5);

            // 색상을 기본값으로 변경
            std::cout << "\x1b[0m";
        }
        if (binaryNumber.test(3)) {
            std::cout << "Binary value: 1000" << std::endl;
            // 노란색으로 설정
            std::cout << "\x1b[0;33m";

            drawsqure(5, 5);

            // 색상을 기본값으로 변경
            std::cout << "\x1b[0m";
        }
        if (binaryNumber.test(4)) {
            std::cout << "Binary value: 10000" << std::endl;
            // 청록색으로 설정
            std::cout << "\x1b[0;36m";

            drawsqure(5, 5);

            // 색상을 기본값으로 변경
            std::cout << "\x1b[0m";
        }
        if (binaryNumber.test(5)) {
            std::cout << "Binary value: 100000" << std::endl;
            // 자홍색으로 설정
            std::cout << "\x1b[0;35m";

            drawsqure(5, 5);

            // 색상을 기본값으로 변경
            std::cout << "\x1b[0m";
        }
        if (binaryNumber.test(6)) {
            std::cout << "Binary value: 1000000" << std::endl;
            return 0;
        }
        else if (!(binaryNumber.any())) {
            std::cout << "Correct value not found." << std::endl;
        }
    }




    return 0;
}