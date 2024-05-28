#include <iostream>
#include <chrono>
#include <thread>

using namespace std;

int main()
{
    int count = 0;
    auto prev_end = chrono::steady_clock::now();
    int desired_delay_ms = 1000;

    while (count < 10)
    {
        auto start = chrono::steady_clock::now();
        // 시간차 구하기
        auto elapsed = chrono::duration_cast<chrono::milliseconds>(start - prev_end).count();

        // 필요한 지연 시간 계산
        int delay_time_ms = desired_delay_ms - elapsed;
        if (delay_time_ms < 0) delay_time_ms = 0; // 음수 지연 시간 방지

        // 출력
        count++;
        cout << count << "   dur:" << elapsed << "ms" << endl;

        // 슬립
        this_thread::sleep_for(chrono::milliseconds(delay_time_ms));

        // 현재 시간을 이전 끝 시간으로 업데이트
        prev_end = chrono::steady_clock::now();
    }
    return 0;
}
