let btn = document.getElementById('chkBtn');
let copyBtn = document.getElementById('copyIcon');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let value = document.getElementById('inputIfsc').value;
    let err = document.getElementById('errMsg');
    if (value === "") {

        err.innerHTML = `**Please enter the IFSC Code`;
        setTimeout(() => {
            err.innerHTML = "";
        }, 5000);
        // console.log("the field is empty");
    }
    else if (value.length < 11 || value.length > 11) {
        err.innerHTML = `**IFSC should be in 11 characters`;
        setTimeout(() => {
            err.innerHTML = "";
        }, 5000);
    }
    else {

        fetch(`https://ifsc.razorpay.com/${value}`).then(response => response.json()).then(data => insert(data));

        function insert(data) {
            const bank = document.getElementById('bankName');
            const branchName = document.getElementById('branchName');
            const district = document.getElementById('district');
            const state = document.getElementById('state');

            bank.value = data.BANK;
            branchName.value = data.BRANCH;
            district.value = data.DISTRICT;
            state.value = data.STATE;
            // console.log(data);

        }
    }
})

copyBtn.addEventListener('click', () => {
    copyBtn.innerHTML = "Copied";
    const bank = document.getElementById('bankName').value;
    const branchName = document.getElementById('branchName').value;
    const district = document.getElementById('district').value;
    const state = document.getElementById('state').value;

    // bank.select();
    // branchName.select();
    // district.select();
    // state.select();

    let str = `Bank Name: ${bank} BranchName: ${branchName} District: ${district} State: ${state}`;

    // window.execCommand('copy');
    navigator.clipboard.writeText(str);

})
