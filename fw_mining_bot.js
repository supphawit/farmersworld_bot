let isRunning = false
async function farmersWolrdBot() {
    try {
        // ตัวแปรสำหรับตั้งค่าการเติม energy และ ซ่อมอุปกรณ์
        // หากอยากให้ปิดอันไหนก็ใส่ค่าเป็น 0 เช่นอยากปิดการเติม energy ก็เปลี่ยนค่าเป็น 0 
        // ตัวอย่าง let autoFillEnergy = 0
        let autoFillEnergy = 1
        let autoRepair = 1

        // ซ่อมอุปกรณ์เมื่อถึง 50
        let repairItem = 50
        // เติม energy เมื่อลดเหลือ 200 และ เนื้อ(FWF) มากกว่า 20 เงื่อนไขนี้คู่กัน
        let energyCondition = 200
        // จำนวนของเนื้อที่จะเติม
        let foodFill = 20

        const homeBtn = document.querySelector(".navbar-group--icon[alt='Map']");
        if (document.getElementsByClassName("home-content").length === 0) {
            homeBtn.click();
        }

        for (const [indexItem, item] of document
            .querySelectorAll(".vertical-carousel-container img")
            .entries()) {

            item.click();

            await new Promise((res) => setTimeout(res, 3e3));

            const buttonMine = document.querySelector(
                ".info-section .plain-button"
            );
            if (buttonMine) {
                if (![...buttonMine.classList].includes("disabled") || ["mine", "claim", "feed", "water"].includes(buttonMine.innerHTML.toLocaleLowerCase())) {
                    console.log('buttonMine.click()');
                    buttonMine.click();
                    const d = new Date();
                    console.log("Mine at " + d.getHours() + ":" + d.getMinutes())

                    await new Promise((res) => setTimeout(res, 15000));

                    let _time = new Date()
                    // If map with mining
                    while (
                        !(
                            document.querySelector(".modal__button-group .plain-button") ||
                            document.querySelector(".modal-stake .modal-stake-close img")
                        ) && (Math.floor((Math.abs(_time - new Date())) / 1000) < 20)
                    ) {
                        await new Promise((res) => setTimeout(res, 5e3));
                    }

                    await new Promise((res) => setTimeout(res, 5e3));

                    (
                        document.querySelector(".modal__button-group .plain-button") ||
                        document.querySelector(".modal-stake .modal-stake-close img")
                    ).click();


                    await new Promise((res) => setTimeout(res, 1e3));

                    // --------------- Repair instruments ---------------
                    if (autoRepair) {
                        let buttonRepair = document.querySelectorAll(
                            ".info-section .plain-button"
                        )[1];
                        let quality = eval(
                            document.querySelector(".card-number").innerText
                        );
                        if (
                            ![...buttonRepair.classList].includes("disabled") &&
                            quality <= (repairItem / 100)
                        ) {
                            buttonRepair.click();
                            await new Promise((res) => setTimeout(res, 10000));
                        }
                    }
                    // --------------- Repair instruments ---------------

                    // --------------- Energy ---------------	
                    if (autoFillEnergy) {
                        let currentEnergy = +document.querySelectorAll(
                            ".resource-number div"
                        )[3].innerText;
                        let currentFish =
                            +document.querySelectorAll(".resource-number")[2].innerText;

                        if (currentEnergy <= energyCondition && currentFish >= foodFill) {
                            console.log('energy click');
                            document.querySelector(".resource-energy img").click();
                            await new Promise((res) => setTimeout(res, 2e3));

                            for (let i = 0; i++ < foodFill;) {
                                document.querySelector(".image-button[alt='Plus Icon']").click();
                                await new Promise((res) => setTimeout(res, 5e2));
                            }

                            console.log('modal-wrapper click');
                            document.querySelector(".modal-wrapper .plain-button").click();

                            await new Promise((res) => setTimeout(res, 2e4));
                        }
                    }
                    // --------------- Energy ---------------
                }
            }
        }

        await new Promise((res) => setTimeout(res, 2e3));
        isRunning = false
    } catch (error) {
        isRunning = false
        console.log(error);
        await new Promise((res) => setTimeout(res, 2e3));
    }
    isRunning = false
};

let start = new Date()
setInterval(async () => {
    console.log('stil runing...');

    if (!isRunning) {
        console.log('search...');
        start = new Date()
        isRunning = true
        farmersWolrdBot()
    }

    var diff = Math.abs(start - new Date());
    var second = Math.floor((Math.abs(start - new Date())) / 1000);
    if (second > 90) {
        console.log('second:', second);
        console.log('overtime');
        while (
            !(
                document.querySelector(".modal__button-group .plain-button") ||
                document.querySelector(".modal-stake .modal-stake-close img")
            )
        ) {
            await new Promise((res) => setTimeout(res, 5e3));
        }

        await new Promise((res) => setTimeout(res, 5e3));
        if (
            document.querySelector(".modal__button-group .plain-button") ||
            document.querySelector(".modal-stake .modal-stake-close img")
        ) {
            (
                document.querySelector(".modal__button-group .plain-button") ||
                document.querySelector(".modal-stake .modal-stake-close img")
            ).click();
            isRunning = false

        }
    }

    if (second > 180) {
        isRunning = false
        second = 0
    }
}, 15000);
