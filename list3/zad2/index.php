<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link href="static/css/index.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="static/js/index.js" defer></script>

    <noscript>
        <link href="static/css/indexNoJs.css" rel="stylesheet" type="text/css">
    </noscript>

    <title>Portfolio</title>
</head>
<body>
    <?php include 'nav.html' ?>
    <?php include 'header.html' ?>

    <main>
        <img src="static/images/profilePicture.jpg" alt="profile picture" class="profilePicture" title="Paweł Data">

        <article id="main">
            <h3><b>Witam na mojej stronie!</b></h3>
            <p>
                Pochodzę z województwa opolskiego, z miejscowości Krapkowice, mam 21 lat.
                Studiuję informatykę na Politechnice Wrocławskiej na wydziale Podstawowych Problemów techniki.
                Jednocześnie Pracuję na 3/5 etatu w Nokii Solution and Networks jako R&D Working Student.
                Moimi głównymi zainteresowaniami są sport (m.in. kalistenika, wspinaczka, bieganie),
                książki oraz programowanie.
            </p>
        </article>
    </main>

    <article class="hobby_list" id="hobby">
        <h2>Zainteresowania</h2>
        <section class="hobby_math_IT">
            <h3>Informatyczne/matematyczne</h3>

            <h4>Metaheurystyka</h4>
            <p>
                Poznałem heurystyki na 4 semestrze studiów. Jest to sposób znalezienia zadowalającego nas
                rozwiązania problemów w krótkim czasie, gdy znalezienie najlepszego z nich zajmuje
                zdecydowanie za długo. Najciekawszym algorytmem dla mnie jest metoda ewolucyjna,
                ponieważ daje naprawdę wiele możliwości edycji i dostosowania się do problemu.
            </p>

            <h4>Kombinatoryka</h4>
            <p>
                Jest to jedna z najbardziej kreatywnych działów matematyki.
                Wymaga od nas zwrócenia uwagi na szczegóły, nie możemy pominąć żadnej możliwości.
                Musimy zarazem skupić się na ogólnym problemie (policzyć ilosć wystąpień/prawdopodobieństwo)
                oraz na szczegółach (sprawdzić skrajne przypadki).
            </p>
        </section>

        <section class="hobby_other">
            <h3>Pozostałe</h3>

            <h4>Sport</h4>
            <p>
                To moje główne hobby. W ciągu swojego życia uprawiałem wiele sportów.
                W wieku nastoletnim przez 5 lat trenowałem tenis stołowy. Przebiegłem półmaraton.
                Uczyłem się grać w golfa. Często jeździłem na rowerze i pływałem.
                Chodziłem na siłownie, uprawiałem kalistenikę. Aktualnie większość czasu spędzam na wspinaczce,
                zarówno na bulderze jak i na wyższych ścianach oraz przygotowuję się do biegów z przeszkodami.
            </p>

            <h4>Gry planszowe</h4>
            <p>
                Czasem spędzam czas ze znajomymi przy grach planszowych.
                Wypożyczamy planszówki z bibliotek lub gramy w gry RPG na podstawie specjalnych książek.
            </p>

            <h4>Książki</h4>
            <p>
                Jeśli nie zajmuję się żadną opisaną wcześniej czynnością, nieraz sięgam po książkę.
                Kiedyś interesowałem się głównie fantastyką, lecz ostatnio zaczynam
                czytać książki z różnych gatunków, by znaleźć coś, co mnie zainteresuje.
            </p>
        </section>
    </article>

    <h2 id="projects">Projekty</h2>

    <article class="project">
        <h4>Kompilator</h4>
        <p>Jest to mój najnowszy projekt jednoosobowy. By zaliczyć przedmiot Języki Formalne i Teoria Translacji
            musieliśmy napisać kompilator prostego jezyka podanego przez prowadzącego.
        </p>
        <p>
            Niestety, ten projekt był wyjątkowo trudny do debuggowania z uwagi na to, że program zwracał
            plik z kodem maszyny wirtualnej. Mój kompilator często nie zwracał błędu przy analizie kodu,
            ale sam kod maszynowy źle się wykonywał. Parę asercji uratowało mnie przed długimi godzinami
            szukania błędu. Na przykład pod koniec danalizy kodu odpalałem funkcję assertFreeRegisters()
            która sprawdzała, czy zwolniłem wszystkie rejestry. To pozwoliło mi uniknąć sytuacji, gdy w pewnym
            momencie nie zwalniam rejestru i przy długim kodzie źródlowym brakuje mi wolnych rejestrów.
        </p>

        <figure>
            <pre>
                <code>
void Memory::assertFreeRegisters() {
    for (Register reg : this->registers)
        assert(not reg.isUsed);
}
                </code>
            </pre>
        </figure>

        <figure>
            <img src="static/images/code.png" alt="code" title="code" class="project_picture">
        </figure>

    </article>

    <article class="project">
        <h4>Carcassone</h4>
        <p>
            Słynna planszowa gra Carcassone, którą napisaliśmy w sześcioosobowym zespole używając języków
            Python oraz Javascript. Gra odbywa się na żywo, na wielu urządzeniach naraz, zatem trzeba
            było przygotować odpowiednią komunikację.
        </p>
        <p>
            Wpadliśmy na pomysł, by użyć dwóch poznanych nam wzorców projektowych: fabryki oraz komendy.
            Każdy wątek (gracz) gdy tylko chciał nam wysłać informację (położenie ptytki, rezygnacja z gry),
            musieliśmy odpowiedno zawiadomić pozostałych graczy. Udało mam się to zapewnić jedną funkcją:
        </p>

        <figure>
            <pre>
                <code>
async def analyze(self, data, websocket):
    """Gets json(data) from websocket,
    Creates command for that data and executes it
    sends back prepared inforamtion to all clients"""
    command = self.factory.createCommand(
                    self.game, data, websocket)
    sendBackJsonTab = (await command).execute()
    for ws, messages in sendBackJsonTab.items():
        for message in messages:
            await ws.send(message)
                </code>
            </pre>
        </figure>

        <figure>
            <img src="static/images/carcassone.png" alt="carcassone" title="carcassone" class="project_picture">
        </figure>

        <p>
            Jakikolwiek input dostaniemy, wysyłamy go do fakbryki, która po analizie nagłówka zwróci nam
            odpowiednią komendę, którą używamy poleceniem execute(). Następnie wysysłamy informację do
            pozostałych zainteresowanych graczy.
        </p>
    </article>

    <article class="project">
        <h4>Kodowanie i kompresja danych</h4>
        <p>
            Był to jeden z najtrudniejszych i zarazem najciekawszych kursów na studiach informatycznych.
            Uczyliśmy się podstawowych technik kodowania danych w taki sposób, by zajmowały mniej miejsca
            w pamięci komputera. Pisaliśmy kodowania bezstratne (np. słownikowe) oraz stratne
            (np. zapisanie obrazka w rozrzeszeniu .tga o ograniczonej liczbie kolorów). Jednocześnie
            poznałem lepiej język C++, w którym napisałem wszystkie programy z tego kursu.
        </p>

        <figure>
            <img src="static/images/kkd_before.png" alt="image" title="image" class="project_picture">
        </figure>

        <figure>
            <img src="static/images/kkd_after.png" alt="image" title="image" class="project_picture">
        </figure>
    </article >

    <article class="project">
        <h4>Student helper</h4>
        <p>
            Aplikacja webowa pomagająca studentowi organizować czas poświęcony na studia, informująca
            o zajęciach i innych obowiązkach. Tego nie da się opisać, to trzeba zobaczyć:
        </p>
        <a href="https://github.com/mateuszkochanek/student-helper" class="repo_link">Link do repozytorium</a>
    </article>

    <?php include 'footer.html' ?>

</body>
</html>
