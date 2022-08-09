window.addEventListener('DOMContentLoaded', () => {
    let resumeBtn = document.getElementById('download-resume-button');
    resumeBtn.addEventListener('click', () => {
        window.open('/public/Dorian_Alexis_Maldonado_resume.pdf', '_blank');
    });
});