#include <iostream>
#include <cpr/cpr.h>
#include "json.hpp"

using namespace std;

int main(int argc, char** argv) {
    auto response = cpr::Get(cpr::Url{"https://google.com"});
    cout << response.text << endl;
    //auto json = nlohmann::json::parse(response.text);
    //std::cout << json.dump(4) << std::endl;
}
