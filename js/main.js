(function($){

$.ready(function() {
	
Core = (function ()  {
	var _showPage = function(selector) {
			$('section#page-section > div').setStyle('display', 'none');
			selector.setStyle('display', 'block');
		},// end _showPage

		_showHome = function() {
			var disp = [];
			for (var key in Nodes) {
				disp[key] = JSON.parse(Nodes[key]);
			}
			var res = '';
			for (var i in disp){
				res += '<div class="Node" id="' + disp[i].id + '"><div class="node-content">' + disp[i].content + '</div><div class="node-date"><div class="date">' + disp[i].date.split(" ")[1] + '</div><div class="month">' + disp[i].date.split(" ")[0] + '</div></div></div>';
			}
			$('#wrapper_node-list').html(res);
			Core.showPage($('#page_node-list'));

		},// end _showHome
		_saveNode = function(data) {
			Nodes.push( JSON.stringify(data) );
			localStorage.setItem('nodes', Nodes);
		}, // end _saveNode

		_deleteNode = function(id) {
            for (var i in Nodes) {
                if (Nodes[i].indexOf(id) != -1) {
                    Nodes.splice(i,1);
                }
            }
        }, // end _deleteNode

		_exit = function() {

		};

		if (localStorage.getItem('nodes')) {
			var unique = '!@#$%^&*()_+1234567890-='
			Nodes = localStorage.getItem('nodes').split('},{').join('}'+unique+'{').split(unique);
		} else {
			Nodes = [];
		}

		return {
			showPage : _showPage,
			showHome : _showHome,
			saveNode : _saveNode,
			deleteNode : _deleteNode,
			exit : _exit
		}
}()),// end Core
	Actions = (function() {
		_hideMenu = function(){
			$('#menu-wrapper').setStyle('display', 'none');
		}
		_showMenu = function(){
			$('#menu-wrapper').setStyle('display', 'block');	
		}

		// show-hide actionbar menu
		$('#menu-button').on('click', function(){
			if ( $('#menu-wrapper').getStyle('display') == 'none' ) {
				_showMenu();
			} else {
				_hideMenu();
			}
		});

		// handlers for actionbar menu
		$('#menu-wrapper #menu-about').on('click', function() {
			Core.showPage($('#page_about'));
		});
		$('#menu-wrapper #menu-exit').on('click', function() {
			alert('exit');
		});


		// start screen handler
		$('#start-screen').on('click', function(){
			Core.showHome();
			$('#screen').setStyle('display','block');
			$(this).setStyle('display','none');

		});

		// 'add task' click handler
		$('#button_new-node button').on('click', function() {
			Core.showPage( $('#page_node-save') )
		});

		// 'save' click handler
		$('#button_save-node button').on('click', function() {
			var curr_date = new Date(),
				months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				date = months[ curr_date.getMonth() ] + ' ' + curr_date.getDate(),
				content = $('#input_node-content textarea#input')[0].value,

				node = {
					id : curr_date.getTime() + '',
					status : 'undone',
					date : date,
					content : content
				};

				Core.saveNode(node);
				Core.showHome();

				$('#input_node-content textarea#input')[0].value = '';
		});


		//node click handler
		$('#page_node-list').delegate('.Node','click', function(e) {
			var id = $(this).attr('id') + '',
				node = {},
				res = '';

			var json_nodes = [];
			for (var key in Nodes) {
				json_nodes[key] = JSON.parse(Nodes[key]);
			}

			for (var i in json_nodes) {
				if (json_nodes[i].id == id) {
					node = json_nodes[i];
				}
			}
			res = '<div id="date-wrapper"><div class="date">' + node.date.split(" ")[0] + '</div><div class="month">' + node.date.split(" ")[1] + '</div></div><div class="node-content" id="' + id+'">' + node.content + '</div>';

			$('#wrapper_node-content').html(res);
			Core.showPage($('#page_node-actions'));
		});

		$('#page_node-list').delegate('.node-content','click', function() {
			 $(this).parent().fire('click');
		});
		


		// modify button handler
		$('#modify-button').on('click', function() {
			var content = $(' #page_node-actions div.node-content').html(),
				id = $('#wrapper_node-content .node-content').attr('id') + '';

			$('#input_node-content textarea#input')[0].value = content;
			Core.showPage ($('#page_node-save')); 
            Core.deleteNode(id);
		});

		 $('#delete-button').on('click', function() {
            var id = $('#wrapper_node-content .node-content').attr('id') + '';
            Core.deleteNode(id);
            Core.showHome();
        });

		$('*').on('click', function () {
			if ($(this) != $('#menu-wrapper'))
			_hideMenu();
		})
}()); // end Actions 

});// end xui.ready

}(xui));