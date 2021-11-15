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

        let result = {};

        if (document.getElementsByClassName("image-button close-modal").length > 0) {
            console.log('close-modal');
            await new Promise((res) => setTimeout(res, 2e3));
            document.getElementsByClassName("image-button close-modal")[0].click()
        }

        if (document.getElementsByClassName('plain-button short undefined').length > 0) {
            await new Promise((res) => setTimeout(res, 2e3));
            if (document.getElementsByClassName('plain-button short undefined')[0].innerText == "OK") {
                console.log('plain-button');
                document.getElementsByClassName("plain-button short undefined")[0].click();
            }
        }

        const mapBtn = document.querySelector(".navbar-group--icon[alt='Map']");
        if (document.getElementsByClassName("modal-map-container undefined").length === 0) {
            mapBtn.click();
        }

        for (let mapId = 0; mapId < 4; ++mapId) {
            if (typeof result[mapId] === "undefined") result[mapId] = {};

            await new Promise((res) => setTimeout(res, 5e3));

            const map = document.querySelectorAll(".map-container-bg")[mapId];

            if (map.style.filter === "grayscale(1)") continue;

            console.log('map.click()');
            map.click();

            await new Promise((res) => setTimeout(res, 5e3));

            for (const [indexItem, item] of document
                .querySelectorAll(".vertical-carousel-container img")
                .entries()) {
                if (typeof result[mapId][indexItem] === "uandefined")
                    result[mapId][indexItem] = 0;

                item.click();

                await new Promise((res) => setTimeout(res, 5e3));

                let buttonMine = document.getElementsByClassName("button-section set-height")[0]
                if (buttonMine) {
                    if (!buttonMine.children[0].className.includes('disabled') || ["mine", "claim", "feed", "water"].includes(buttonMine.innerHTML.toLocaleLowerCase())) {
                        console.log('buttonMine.click()');
                        buttonMine.click();
                        ++result[mapId][indexItem];
                        const d = new Date();
                        console.log("Mine at " + d.getHours() + ":" + d.getMinutes())

                        await new Promise((res) => setTimeout(res, 2e3));

                        // If map with mining
                        if (mapId === 0) {
                            while (
                                !document.querySelector(".modal__button-group .plain-button")
                            ) {
                                await new Promise((res) => setTimeout(res, 5e3));
                            }

                            await new Promise((res) => setTimeout(res, 5e3));

                            document
                                .querySelector(".modal__button-group .plain-button")
                                .click();

                            await new Promise((res) => setTimeout(res, 1e3));

                            // --------------- Repair instruments ---------------
                            if (autoRepair) {
                                const buttonRepair = document.querySelectorAll(
                                    ".info-section .plain-button"
                                )[1];
                                const quality = eval(
                                    document.querySelector(".card-number").innerText
                                );
                                if (
                                    ![...buttonRepair.classList].includes("disabled") &&
                                    quality <= (repairItem / 100)
                                ) {
                                    buttonRepair.click();
                                    await new Promise((res) => setTimeout(res, 1e3));
                                }
                            }
                            // --------------- Repair instruments ---------------
                        }

                        await new Promise((res) => setTimeout(res, 1e4));

                        // --------------- Energy ---------------	
                        if (autoFillEnergy) {
                            const currentEnergy = +document.querySelectorAll(
                                ".resource-number div"
                            )[3].innerText;
                            const currentFish =
                                +document.querySelectorAll(".resource-number")[2].innerText;


                            if (currentEnergy <= energyCondition && currentFish >= foodFill) {
                                console.log('energy click');
                                document.querySelector(".resource-energy img").click();
                                await new Promise((res) => setTimeout(res, 1e3));

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
            if (mapId !== 4) mapBtn.click();
        }

        await new Promise((res) => setTimeout(res, 3e3));
        isRunning = false
        // document.getElementsByClassName("navbar-group--icon")[0].click()

    } catch (error) {
        isRunning = false
        console.log(error);
        await new Promise((res) => setTimeout(res, 3e3));
    }
    isRunning = false
};

let start = new Date()
setInterval(() => {
    console.log('stil runing...');

    if (!isRunning) {
        console.log('search...');
        start = new Date()
        isRunning = true
        farmersWolrdBot()
    }

    var diff = Math.abs(start - new Date());
    var second = Math.floor((diff / 1000));
    if (second > 90) {
        console.log('second:', second);
        console.log('overtime');
        if (document.getElementsByClassName("image-button close-modal").length > 0) {
            console.log('overtime: close-modal');
            document.getElementsByClassName("image-button close-modal")[0].click()
        }

        if (document.getElementsByClassName('plain-button short undefined').length > 0) {
            if (document.getElementsByClassName('plain-button short undefined')[0].innerText == "OK") {
                console.log('overtime: plain-button');
                document.getElementsByClassName("plain-button short undefined")[0].click();
            }
        }
    }

    if (second > 1800 ) {
        second = 0
        isRunning = false
    }
}, 15000);
