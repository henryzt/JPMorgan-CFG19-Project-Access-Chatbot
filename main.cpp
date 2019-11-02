#include <iostream>
#include <cpr/cpr.h>
#include <fstream>
#include "json.hpp"
#pragma GCC optimize ("Ofast")

using namespace std;

static int fast_io = [] () {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    return 0;
} ();

inline cpr::Response test () {
    auto response = cpr::Get(cpr::Url{"https://httpbin.org/get"});
    return response;
}

void json_test () {
    auto json = nlohmann::json::parse(test().text);
    cout << json.dump(4) << endl;
}

struct Course {
    string name;
    string qualification;
    double duration;

    Course (string cn, string cq, double cd) : name(cn), qualification(cq), duration(cd) { }

};

struct University {
    string name;
    vector<Course> cs;

    University (string s) : name(s) { }

    void add_course (string cn, string cq, double cd) {
        cs.emplace_back(cn, cq, cd);
    }
};

int main(int argc, char** argv) {
    //json_test();

    ifstream fsucas_endpoint("ucas_endpoint.txt");
    string ucas_endpoint((std::istreambuf_iterator<char>(fsucas_endpoint)),std::istreambuf_iterator<char>());

    ifstream fsreq_body("req_body.txt");
    string req_body((std::istreambuf_iterator<char>(fsreq_body)),std::istreambuf_iterator<char>());

    ifstream fsreq_header("req_header.txt");
    string req_header((std::istreambuf_iterator<char>(fsreq_header)),std::istreambuf_iterator<char>());

    auto req_body_json = nlohmann::json::parse(req_body);

    vector<University> unis;

    for (int i = 1; i < 25; i++) {
        req_body_json["options"]["paging"]["pageNumber"] = i;
        //cout << req_body_json.dump() << endl;
        auto response = cpr::Post(cpr::Url(ucas_endpoint), cpr::Body(req_body_json.dump()),
                                  cpr::Header{{"Content-Type", "application/json"}});
        auto response_json = nlohmann::json::parse(response.text);
        for (int j = 0; j < 15; j++) {
            if (response_json["providers"][j]["name"] == nullptr) break;
            else unis.emplace_back(static_cast<string>(response_json["providers"][j]["name"]));
        }
    }

    req_body_json["options"]["paging"]["pageNumber"] = 0;
    req_body_json["options"]["paging"]["pageSize"] = 50;
    for (auto& u : unis) {
        cout << "Processing " << u.name << endl;
        req_body_json["filters"]["providers"] = {u.name};
        auto response = cpr::Post(cpr::Url(ucas_endpoint), cpr::Body(req_body_json.dump()),
                                  cpr::Header{{"Content-Type", "application/json"}});
        auto response_json = nlohmann::json::parse(response.text);
        //cout << response_json.dump() << endl;
        auto course_array = response_json["providers"][0]["courses"];
        for (int j = 0; j < course_array.size(); j++) {
            //cout << course_array[j]["courseTitle"] << " " << course_array[j]["options"][0]["outcomeQualification"]["caption"] << " " << course_array[j]["options"][0]["duration"]["quantity"] << endl;
            if (course_array[j]["options"][0]["duration"]["quantity"] == nullptr) continue;
            u.add_course(course_array[j]["courseTitle"], course_array[j]["options"][0]["outcomeQualification"]["caption"], course_array[j]["options"][0]["duration"]["quantity"]);
        }
    }

    nlohmann::json dataset_json;
    for (auto uni : unis) {
        dataset_json[uni.name] = {};
        for (auto cs : uni.cs) {
            dataset_json[uni.name].push_back({cs.name, cs.qualification, cs.duration});
        }
    }

    freopen("dataset.json", "w", stdout);
    cout << dataset_json.dump() << endl;
    fclose(stdout);

    return 0;
}
