(async () => {
    // ตัวแปรสำหรับตั้งค่าการเติม energy และ ซ่อมอุปกรณ์
    // หากอยากให้ปิดอันไหนก็ใส่ค่าเป็น 0 เช่นอยากปิดการเติม energy ก็เปลี่ยนค่าเป็น 0 
    // ตัวอย่าง let autoRepair = 0
    let autoRepair = 1
    let autoFillEnergy = 1

    // ซ่อมอุปกรณ์เมื่อถึง 50
    let repairItem = 50
    // เติม energy เมื่อลดเหลือ 200 และ เนื้อ(FWF) มากกว่า 20 เงื่อนไขนี้คู่กัน
    let energyCondition = 200
    // จำนวนของเนื้อที่จะเติม
    let foodFill = 20

    const mapBtn = document.querySelector(".navbar-group--icon[alt='Map']");
    mapBtn.click();

    while (1) {
       
        for (let mapId = 0; mapId < 4; ++mapId) {

            await new Promise((res) => setTimeout(res, 5e3));

            const map = document.querySelectorAll(".map-container-bg")[mapId];

            if (map.style.filter === "grayscale(1)") continue;

            map.click();

            await new Promise((res) => setTimeout(res, 5e3));

            for (const [indexItem, item] of document
                .querySelectorAll(".vertical-carousel-container img")
                .entries()) {
         
                item.click();

                await new Promise((res) => setTimeout(res, 3e3));

                const buttonMine = document.querySelector(
                    ".info-section .plain-button"
                );

                if (
                    ![...buttonMine.classList].includes("disabled") &&
                    ["mine", "claim", "feed", "water"].includes(buttonMine.innerHTML.toLocaleLowerCase())
                ) {
                    buttonMine.click();

                    await new Promise((res) => setTimeout(res, 1e3));

                    // If map with mining
                    if (mapId === 0) {
                        await new Promise((res) => setTimeout(res, 1e4));

                        // Repair instruments
                        if (autoRepair) {
                            const buttonRepair = document.querySelectorAll(
                                ".info-section .plain-button"
                            )[1];
                            const quality = eval(
                                document.querySelector(".card-number").innerText
                            );
                            if (
                                ![...buttonRepair.classList].includes("disabled") &&
                                quality < (repairItem / 100)
                            ) {
                                buttonRepair.click();
                                await new Promise((res) => setTimeout(res, 1e3));
                            }
                        }
                    }

                    await new Promise((res) => setTimeout(res, 1e4));

                    if (autoFillEnergy) {
                        const currentEnergy = +document.querySelectorAll(
                            ".resource-number div"
                        )[3].innerText;
                        const currentFish =
                            +document.querySelectorAll(".resource-number")[2].innerText;
                        if (parseFloat(currentEnergy) <= energyCondition && parseFloat(currentFish) >= foodFill) {
                            document.querySelector(".resource-energy img").click();
                            await new Promise((res) => setTimeout(res, 1e3));

                            for (let i = 0; i++ < foodFill;) {
                                document.querySelector(".image-button[alt='Plus Icon']").click();
                                await new Promise((res) => setTimeout(res, 5e2));
                            }

                            document.querySelector(".modal-wrapper .plain-button").click();

                            await new Promise((res) => setTimeout(res, 2e4));
                        }
                    }
                }
            }

            mapBtn.click();
        }
    }
})();
