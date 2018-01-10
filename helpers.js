var getAndPrintProjects = (projects)=>{
    let out=""
    projects.forEach(element => {
       out +=  element.name;
    });
    return out;
}

module.exports.getAndPrintProjects = getAndPrintProjects;