/**
 * Created by naveen on 29/10/17.
 */

console.log('Copyright Naveen  29/10/2017');
console.log('github: https://github.com/Naveen-S');
var todoController = (function () {

})();

var UIController = (function () {
    var CLASSES = {
        completed: 'completed',
        input: 'input[type="text"]'
    };
    return {
        getClasses: function () {
            return CLASSES;
        },

        strachOff: function (event) {
            $(this).toggleClass(CLASSES.completed);
        },

        toggleInput: function () {
            $(CLASSES.input).fadeToggle();

        },

        addTodo: function (e) {
            if (e.which == 13) {
                $('ul').append('<li><span><i class="fa fa-trash-o" aria-hidden="true"></i></span> ' + $(this).val() + '</li>');
                $(this).val('');
            }
        },
        deleteTodo: function (e) {
            $(this).parent().fadeOut(500, function () {
                $(this).remove();
            });
            e.stopPropagation();
        }
    }
})();

var controller = (function () {
    var setup = function () {
        setupEventListeners();
    };

    var setupEventListeners = function () {
        var me = this;
        // Add new To-do
        $('input[type="text"]').keypress(UIController.addTodo);
        // On Hover of li

        // Delete to-do
        /**
         * Reason for doing in this way?
         * Whenever the page loads we don't have all the new to-do's(user created to-do apart from ones we added in html) on the screen so click event on span is not registered.
         * Or in other words, adding click listener like $(span).click(...) will register listener on only span which is present on page load, not on dynamic item we create later.
         * So to register click of all the span, you first select the ul which is present, on the page load
         * and tell it, all the span inside the ul should be added this listener. (That's how you register event for dynamic items which isn't present on the page load.)
         *
         * Hope I remember this when I see this later :P
         */
        $('ul').on('click', 'span', UIController.deleteTodo);

        // click on li
        $('ul').on('click', 'li', UIController.strachOff);
        // click on delete.

        // Click on pencil Icon
        $('.fa-pencil').on('click', UIController.toggleInput);


    };

    return {
        init: function () {
            setup();
        }
    }
})();

controller.init();