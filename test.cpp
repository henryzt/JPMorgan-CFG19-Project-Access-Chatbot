#include <iostream>
#include <cpr/cpr.h>
#include "json.hpp"

using namespace std;

class Test {
public:
    static inline cpr::Response test() {
        auto response = cpr::Get(cpr::Url{"https://httpbin.org/get"});
        return response;
    }

    static inline void json_test() {
        auto json = nlohmann::json::parse(test().text);
        cout << json.dump(4) << endl;
    }
};