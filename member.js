function skillsMember() {
    var skills = ['HTML', 'CSS', 'JS', 'PHP', 'MySQL'];
    var member = {
        name: 'John',
        age: 25,
        skills: skills,
        showSkills: function () {
            var skills = this.skills;
            skills.forEach(function (skill) {
                console.log(skill);
            });
        }
    };
    member.showSkills();
}