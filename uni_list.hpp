#include <unordered_set>
#include <unordered_map>

using namespace std;

const unordered_set<string> OXBRIDGE{"University of Cambridge", "University of Oxford"};
const unordered_set<string> G5{"University of Cambridge", "University of Oxford", "UCL (University College London)",
                               "Imperial College London", "London School of Economics and Political Science, University of London"};
const unordered_set<string> BETTERUNI{"University of Edinburgh", "Durham University", "University of Manchester", "University of Bath"};
const unordered_set<string> RUSSELLGROUP{"University of Birmingham",
                                         "University of Bristol",
                                         "University of Cambridge",
                                         "Cardiff University",
                                         "Durham University",
                                         "University of Edinburgh",
                                         "University of Exeter",
                                         "University of Glasgow",
                                         "Imperial College London",
                                         "King's College London",
                                         "University of Leeds",
                                         "University of Liverpool",
                                         "London School of Economics and Political Science, University of London",
                                         "University of Manchester",
                                         "Newcastle University",
                                         "University of Nottingham",
                                         "University of Oxford",
                                         "Queen Mary University of London",
                                         "Queen’s University Belfast",
                                         "University of Sheffield",
                                         "University of Southampton",
                                         "UCL (University College London)",
                                         "University of Warwick",
                                         "University of York"};

const unordered_map<string, int> SUBJECT{
        {"Finance", 10},
        {"Economics", 10},
        {"Engineering", 10},
        {"Electric", 15},
        {"Computing", 20},
        {"Computer", 20},
        {"Math", 15},
        {"Management", 10}
};
