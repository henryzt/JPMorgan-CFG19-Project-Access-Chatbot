#include <string>

using namespace std;

struct Course {
    string name;
    string qualification;
    double duration;
    int points = 0;

    Course (string cn, string cq, double cd, int add) : name(cn), qualification(cq), duration(cd) {
        points += add;
        if (duration < 3.5) points += 10;
        for (auto sub_pair : SUBJECT) {
            if (cn.find(sub_pair.first) != string::npos) points += sub_pair.second;
        }
    }

};

struct University {
    string name;
    vector<Course> cs;
    int points = 0;

    University (string s) : name(s) {
        if (OXBRIDGE.find(s) != OXBRIDGE.end()) points += 100;
        else if (G5.find(s) != G5.end()) points += 75;
        if (BETTERUNI.find(s) != BETTERUNI.end()) points += 50;
        if (RUSSELLGROUP.find(s) != RUSSELLGROUP.end()) points += 25;
    }

    void add_course (string cn, string cq, double cd) {
        cs.emplace_back(cn, cq, cd, points);
    }
};