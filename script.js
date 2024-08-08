document.getElementById("doba_najmu_typ").addEventListener("change", function() {
    const typ = this.value;
    const dobaNajmuInput = document.getElementById("doba_najmu_input");
    const neurcitoKonec = document.getElementById("neurcito_konec");

    if (typ === "určitá") {
        dobaNajmuInput.style.display = "block";
        neurcitoKonec.checked = false;
        neurcitoKonec.disabled = false;
    } else {
        dobaNajmuInput.style.display = "none";
        neurcitoKonec.checked = true;
        neurcitoKonec.disabled = true;
        document.getElementById("konec_najmu").disabled = true;
    }
});

document.getElementById("doba_najmu_cislo").addEventListener("input", function() {
    const cislo = parseInt(this.value);
    const dobaNajmuText = document.getElementById("doba_najmu_text");

    if (cislo === 1) {
        dobaNajmuText.textContent = "týden";
    } else if (cislo >= 2 && cislo <= 4) {
        dobaNajmuText.textContent = "týdny";
    } else {
        dobaNajmuText.textContent = "týdnů";
    }

    const konecNajmu = document.getElementById("konec_najmu");
    const dnesniDatum = new Date();
    dnesniDatum.setDate(dnesniDatum.getDate() + cislo * 7);
    konecNajmu.valueAsDate = dnesniDatum;
});

document.getElementById("neurcito_konec").addEventListener("change", function() {
    const konecNajmu = document.getElementById("konec_najmu");
    if (this.checked) {
        konecNajmu.disabled = true;
    } else {
        konecNajmu.disabled = false;
    }
});

document.getElementById("contract-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const dnesniDatum = new Date().toLocaleDateString("cs-CZ");

    const jmeno_najemce = document.getElementById("jmeno_najemce").value;
    const otisk_najemce = document.getElementById("otisk_najemce").value;
    const nemovitost = document.getElementById("nemovitost").value;

    const doba_najmu_typ = document.getElementById("doba_najmu_typ").value;
    let doba_najmu = "";
    let konec_najmu = "";
    
    if (doba_najmu_typ === "neurčitá") {
        doba_najmu = "neurčitou";
        konec_najmu = "neurčito";
    } else {
        const doba_najmu_cislo = parseInt(document.getElementById("doba_najmu_cislo").value);
        const doba_najmu_text = document.getElementById("doba_najmu_text").textContent;
        doba_najmu = `${doba_najmu_cislo} ${doba_najmu_text}`;
        konec_najmu = new Date(document.getElementById("konec_najmu").value).toLocaleDateString("cs-CZ");
    }

    const cena = document.getElementById("cena").value;
    const misto_podepsani = document.getElementById("misto_podepsani").value;

    const smlouva = `
SMLOUVA O PRONÁJMU NEMOVITOSTI

uzavřená mezi:

Pronajímatelem:
Jméno a příjmení: Jack Dreilor
Číslo průkazu: 2CD585FF772DE4ACBACB83245F40D0CE
(dále jen "Pronajímatel")

a

Nájemcem:
Jméno a příjmení: ${jmeno_najemce}
Číslo průkazu: ${otisk_najemce}
(dále jen "Nájemce")

I. Předmět nájmu

Pronajímatel přenechává Nájemci do užívání nemovitost nacházející se na adrese ${nemovitost} (dále jen "Nemovitost").

II. Doba nájmu

Nájem se sjednává na dobu ${doba_najmu} od ${dnesniDatum} do ${konec_najmu}.

III. Nájemné

Výše nájemného činí ${cena},- Kč za týden.
Nájemné nájemce bude splácet každý týden po dobu nájmu.
Nájemce je povinen zřídit trvalý příkaz k úhradě nájemného na bankovní účet Jack Dreilor.

IV. Povinnosti Nájemce

Nájemce je povinen užívat Nemovitost řádně a v souladu s jejím určením.
Nájemce nesmí provádět žádné stavební úpravy bez předchozího písemného souhlasu Pronajímatele.
Nájemce je povinen udržovat Nemovitost v čistotě a řádném stavu.
Nájemce je odpovědný za dění v nemovitosti.

VI. Ukončení nájmu

VII. Zahájení nájmu

Nájem se zahajuje dne ${dnesniDatum}.

VIII. Závěrečná ustanovení

Nájemce může smlouvu vypovědět písemně s výpovědní lhůtou 1 týdne od písemného upozornění pronajímatele.
Pronajímatel může smlouvu vypovědět písemně s výpovědní lhůtou 1 týdne, bez udání důvodu.

Smlouva je vyhotovena ve dvou stejnopisech, z nichž každý má platnost originálu. Každá ze stran obdrží jedno vyhotovení.
Tuto smlouvu lze měnit pouze písemnými dodatky podepsanými oběma smluvními stranami.
V ${misto_podepsani}, dne ${dnesniDatum}.
`;

    // Zkopírování smlouvy do schránky
    navigator.clipboard.writeText(smlouva).then(function() {
        alert("Smlouva byla zkopírována do schránky!");
    }, function() {
        alert("Chyba při kopírování smlouvy do schránky.");
    });

    document.getElementById("generated-contract").textContent = smlouva;
});
