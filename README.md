# Filmo paieška naudojant API
Projekto pagrindinis tikslas - praktika su [Axios API](https://github.com/axios/axios).  
Idėja - prisijungti prie [OMDb API](http://www.omdbapi.com/), atvaizduoti paieškos rezultatus atskiromis kortelėmis, horizontaliai.  
Projekto trukmė dvi paros.  
**Baigtą projektą** galima rasti [čia](http://owner-occupied-bag.000webhostapp.com/axios).

## Dizainas
Dizainas darytas su Adobe XD programa. Minimalus, šviesus. Tik mobile.  
[XD failas](https://github.com/vytascepulis/find-a-movie/blob/master/movie.xd)  
[pdf failas](https://github.com/vytascepulis/find-a-movie/blob/master/movie.pdf)

### Dizaino idėja
Naudotojas aplikacijos apačioje mato paieškos mygtuką, jį paspaudus išlenda input field ir automatiškai yra sufokusuojamas. Atlikus paiešką, atsiranda atskiros rezultatų kortelės, kurios projektuojamos horizontaliai, kad užimtų kuo mažiau ekrano vietos.

### Submit mygtukas
Mygtukas turi pseudo elementus *before* bei *after*, atitinkančius jo paties dizainą, tik su animacija, kuri didina jų scale. **Animacija hoste neveikia**.  
```
.search-btn:before,
.search-btn:after {
	content: '';
	display: block;
	position: absolute;
	border-radius: 50%;
    border: 5px solid rgba(29,68,223,0.4);
	left: -10px;
	top: -10px;
	right: -10px;
    bottom: -10px;
    animation: pulse 2s linear infinite;
    opacity: 0;
    backface-visibility: hidden;
}

.search-btn:after {
    animation-delay: .7s;
    border: 5px solid rgba(29,68,223,0.5);
}
```  
```
@keyframes pulse {
    0% {
        transform: scale(0.5);
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
    100% {
        transform: scale(1.2);
        opacity: 0;
    }
}
```

### Kortelės
Kortelių background-image savybė yra rezultato iš API gautas *poster* atsakymas. Pats fonas yra pritamsintas su before pseudo elementu (elemento z-index aukštesnis, background juodas, opacity 0.5), taip pasiekiamas kontrastas tarp background ir content.

### Kortelės turinys
Turinys, jei per didelis kortelės fixed aukščiui, gali būti scrollinamas:  
```
.about {
    margin-top: 20px;
    height: 180px;
    overflow-y: scroll;
}
```

## Funkcionalumas
Naudojant axios paimama informacija iš OMDb su tam tikru paieškos žodžiu. Su gautų rezultatų *IMDBid* atsakymais iš naujo ieškomi filmai, tik šįkart žymiai smulkiau. Galiausiai sukuriamos kortelės su visa reikiama informacija.

## Iškilusios kliūtys
Overflow CSS savybės desktop versijoje rodo 'scrollbarus'. Mobile taip pat yra, tačiau nerėžia akies. Dviejų *promise* gavimas ir valdymas.

## Galimybės plėsti arba tobulinti
* Paskutinė kortelė tuščia, click eventas su loadMore(); funkcija
* Horizontalus 'scrollinimas' padarytas ne su CSS, o su Javascript