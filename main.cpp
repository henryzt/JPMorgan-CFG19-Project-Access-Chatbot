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
};

struct University {
    string name;
    vector<Course> cs;
    University (string s) : name(s) { }
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

    for (int i = 1; i <= 5; i++) {
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

    for (auto u : unis) {
        cout << u.name << endl;
    }

    return 0;
}
