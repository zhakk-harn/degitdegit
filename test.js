const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");

git.listServerRefs({
   http,
			url:"https://github.com/AtelierNum/templates"
		}).then(refs => {
				console.log(`
			***************
				isogit refs
			***************
			`)
			console.dir(refs);
		}).catch(err => {
			console.error(err);
      })
      
      //FIXME make that shit more readable to tech wiz
   git.listServerRefs({
			http,
			url:"https://github.com/AtelierNum/templates"
		}).then(refs => {
         refs = refs.map(r => {
            if (r.ref === "HEAD") {
               return {
                  type: "HEAD",
                  hash: r.oid
               }
            }

				r.hash = r.oid;
				
				r.name = r.ref.split("/").slice(2).join("/"),
					r.type = r.ref.split("/")[1] === 'heads'
						? 'branch'
						: r.ref.split("/")[1] === 'refs'
							? 'ref'
                     : r.ref.split("/")[1];
         
            delete r.oid;
            delete r.ref;

            return r
			})
				console.log(`
			***************
				isogit refs
			***************
			`)
			console.dir(refs);
		}).catch(err => {
			console.error(err);
		})