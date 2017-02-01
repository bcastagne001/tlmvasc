$( function() {
    var buttons = $(".section button");
    var status = $("#status");
    var audio = $('#sound-fx')[0];
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var error;
    var myTimeout;
    var activeSection;

    startGame();

    function startGame() {
        $('.section').hide();
        $('.section#intro').show();
        error = 0;
        updateResultMessages();
        playAudio('audio/debut.mp3');
    }

    function playAudio(filename) {
        $(audio).attr('src', filename );
        audio.load();
        audio.play();
    }

    buttons.click( function() {
        var go = $(this).attr('go');
        if(go == 'intro') {
            startGame();
        } else {
            gotoSection(go);
        }
    });

    function timeout() {
        myTimeout = setTimeout(function() {
            modal.style.display = "block";
            addOneError();
        }, 15500);
    }

    function stopTimeout() {
        clearTimeout(myTimeout);
    }

    $('button.question').click( function() {
        playAudio('audio/chrono.mp3');
        timeout();
    });

    $('button.vrai').click( function() {
        playAudio('audio/vrai.mp3');
        stopTimeout();
    });

    $('button.faux').click( function() {
        playAudio('audio/faux.mp3');
        stopTimeout();
        addOneError();
    });

    $('button.resultat').click( function() {
        playAudio('audio/fin.mp3');
    });

    function findNextQuestionId() {
        return activeSection.nextAll('.section[id*="q"]').first().attr('id');
    }

    function gotoSection(key) {
        $('.section').hide();
        var section = $('.section#' + key);
        section.show();
        activeSection = section;
    }

    span.onclick = function() {
        modal.style.display = "none";
        gotoSection(findNextQuestionId());
        playAudio('audio/chrono.mp3');
        timeout();
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            gotoSection(findNextQuestionId());
            playAudio('audio/chrono.mp3');
            timeout();
        }
    };

    function setErrorMessage(errors) {
        $('#resultat').find('.errors').html(errors);
    }

    function setResultMessage(message) {
        $('#resultat').find('.message').html(message);
    }

    function updateResultMessages() {
        if (error == 1) {
            setErrorMessage("Vous n'avez fait qu'" + error + " erreur !");
        } else {
            setErrorMessage("Vous avez fait " + error + " erreurs !");
        }

        if (error <= 3) {
            setResultMessage("Bravo, vous êtes prêt à prendre la route avec la plus grande sérénité !");
        } else if (error > 3 && error < 7) {
            setResultMessage("Aïe ! Allez, ne vous découragez pas ! Quelques efforts de plus et ce sera gagné !");
        } else {
            setResultMessage("Bon, là, ça ne va pas du tout... Il va falloir réviser votre code, et vite !");
        }
    }

    function addOneError() {
        error++;
        updateResultMessages();
    }

} );