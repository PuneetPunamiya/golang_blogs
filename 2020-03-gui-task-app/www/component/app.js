// create a global event-bus
let eventBus = new Vue();
window.eventBus = eventBus;

new Vue({
    el: '#app',
    data: function () {
        return {
            showSideMenu: false,

            today: new Date(),
            todayInString: '',
            chosenDateToDisplay: '',

            notes: {},

// TODO: are there any contextMenu showing
            isContextMenuShowing: false,
        };
    },
    mounted: function() {
        // get all notes from repo
        window.onGetNotes();

        // callback on getting notes OR after notes being updated (update the "notes" object)
        window.eventBus.$on('go-notes-all-loaded', this.onGoNotesAllLoadedEvent);

        if (!this.today) {
            // should not happen though
            this.today = new Date();
        }
        this.todayInString = this.today.getFullYear() + '-';
        this.todayInString += ((this.today.getMonth()+1)<10)?'0'+(this.today.getMonth()+1):this.today.getMonth()+1;
        this.todayInString += "-";
        this.todayInString += (this.today.getDate()<10)?'0'+this.today.getDate():this.today.getDate();
        // for JUST mounted -> today = chosen-date
        this.chosenDateToDisplay = this.todayInString;

// TODO: add back a click event to remove our custom contextMenu
        window.addEventListener('click', function (event) {
            if (this.isContextMenuShowing === true) {
// TODO: HIDE it
            }
        });

    },
    methods: {
        /* ------------------ */
        /*   event handlers   */
        /* ------------------ */

        onMenuClick: function () {
            this.showSideMenu = true;
        },
        onUpdateShowSideMenu: function (data) {
            this.showSideMenu = data;
        },
        onUpsertMemo: function () {
            this.isContextMenuShowing = true;
        },
        onCloseNoteCreation: function () {
            this.isContextMenuShowing = false;
        },

        onGoNotesAllLoadedEvent: function (data) {
            this.notes = data;
        }


    },
});