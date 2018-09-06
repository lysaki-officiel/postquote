vueshow = new Vue({
	el : "#vueshow",
	data : {
		fics : [],
		numberOfPosts : 0
	},
	methods : {
		getposts : async function(){
			let posts = await axios.get('/posts');
			this.fics = posts.data;
			this.numberOfPosts = posts.length;
			console.log(posts.data);
		}
	}
});

vuepost = new Vue({
	el : "#vuepost",
	data: {
		empty : false,
		logged : false
	},
	methods : {
		postfic : async function(){
			try{
				let fic = {
					title : this.$refs.title.value,
					content : this.$refs.text.value,
					author : vuelog.username,
				};
				console.log(fic);
				if (fic.title != '' && fic.content != '')
				{
					this.empty =  false;
					let response = await axios({
						method: 'post',
						url : '/postafic',
						data : fic
					})
					vueshow.getposts();
				}
				else
					this.empty = true;
			}catch(error){
				console.log(error);
			}
		}
	}
});

vuelog = new Vue({
	el : '#vuelog',
	data : {
		selected : 'Log In',
		logged : false,
		empty : false,
		username : '',
		error : '',
	},
	methods : {
		register:async function(){
			let user = {
				username : this.$refs.username.value,
				password : this.$refs.password.value
			};
			if (user.username != '' && user.password != '')
			{
				this.empty = false;
				let response = await axios({
					method: 'post',
					url : '/register',
					data : user
				});
				console.log(response.data);
				if (response.data == "Success")
				{
					vuepost.logged = true;
					this.logged = true,
					this.username = user.username;
					this.error = '';
				}
				else
					this.error = response.data;
			}
			else
				this.empty = true;
		},
		login:async function(){
			let user = {
				username : this.$refs.username.value,
				password : this.$refs.password.value
			};
			console.log(user);
			if (user.username != '' && user.password != ''){
				this.empty = false;
				let response = await axios({
					method: 'post',
					url : '/login',
					data : user
				});
				console.log(response.data);
				if (response.data == "Success")
				{
					vuepost.logged = true;
					this.logged = true,
					this.username = user.username;
					this.error = '';
				}
				else
					this.error = response.data;
			}
			else
				this.empty = true;
		},
		submit:async function(){
			console.log(this.selected);
			if (this.selected == "Log In")
			{
				this.login();
			}
			else
				this.register();
		},
		logout: async function(){
			this.username = '';
			this.logged = false;
			this.empty = false;
			this.error = '';
			vuepost.logged = false;
		}
	}
})
vueshow.getposts();
