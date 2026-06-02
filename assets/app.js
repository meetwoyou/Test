/* Meetwoyou — shared app logic */
(function(){
  const LS = window.localStorage;
  const KEY = 'meetwoyou_state_v1';
  const SESSION = 'meetwoyou_session_v1';

  const seed = () => ({
    users: [
      {id:'u1', name:'Aria Sen', username:'aria', avatar:av('Aria','7c3aed'), bio:'Designer · Dreamer ✨', followers:1248, following:312, verified:true},
      {id:'u2', name:'Rohan Das', username:'rohan', avatar:av('Rohan','ec4899'), bio:'Photographer 📸 | Travel', followers:842, following:198, verified:false},
      {id:'u3', name:'Maya Khan', username:'maya', avatar:av('Maya','22d3ee'), bio:'Coffee & code ☕', followers:2390, following:540, verified:true},
      {id:'u4', name:'Dev Roy', username:'dev', avatar:av('Dev','f59e0b'), bio:'Building the future', followers:560, following:230, verified:false},
      {id:'u5', name:'Niha Sharma', username:'niha', avatar:av('Niha','22c55e'), bio:'Music · Mood · Memes', followers:1890, following:420, verified:false}
    ],
    posts: [
      {id:'p1', userId:'u3', text:'Sunset over the city tonight 🌇 nothing beats this view.', image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900', likes:124, comments:18, liked:false, saved:false, time:Date.now()-3600e3},
      {id:'p2', userId:'u2', text:'Morning ride through the misty hills. New blog coming soon!', image:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900', likes:89, comments:7, liked:true, saved:false, time:Date.now()-7200e3},
      {id:'p3', userId:'u1', text:'Just shipped a new design system 🎨 thoughts?', image:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900', likes:340, comments:42, liked:false, saved:true, time:Date.now()-86400e3},
      {id:'p4', userId:'u5', text:'New playlist dropped 🎧 link in bio.', image:'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900', likes:58, comments:5, liked:false, saved:false, time:Date.now()-172800e3}
    ],
    stories: [
      {id:'s1', userId:'u1', image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600', time:Date.now()-3600e3, seen:false},
      {id:'s2', userId:'u2', image:'https://images.unsplash.com/photo-1473042904451-00171c69419d?w=600', time:Date.now()-7200e3, seen:false},
      {id:'s3', userId:'u3', image:'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600', time:Date.now()-10800e3, seen:true},
      {id:'s4', userId:'u4', image:'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600', time:Date.now()-14400e3, seen:false},
      {id:'s5', userId:'u5', image:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600', time:Date.now()-18000e3, seen:false}
    ],
    chats: [
      {id:'c1', userId:'u1', messages:[
        {from:'u1', text:'Hey! How is the new app?', t:Date.now()-3600e3},
        {from:'me', text:'It looks amazing 😍', t:Date.now()-3500e3},
        {from:'u1', text:'Glad you like it! ✨', t:Date.now()-3400e3}
      ], unread:1},
      {id:'c2', userId:'u3', messages:[
        {from:'u3', text:'Coffee tomorrow?', t:Date.now()-7200e3},
        {from:'me', text:'Sure, usual place?', t:Date.now()-7100e3}
      ], unread:0},
      {id:'c3', userId:'u2', messages:[
        {from:'u2', text:'Check out my new shots!', t:Date.now()-86400e3}
      ], unread:2}
    ],
    notifications: [
      {id:'n1', type:'like', userId:'u3', text:'liked your post', t:Date.now()-1800e3},
      {id:'n2', type:'follow', userId:'u4', text:'started following you', t:Date.now()-3600e3},
      {id:'n3', type:'comment', userId:'u2', text:'commented: "Stunning!"', t:Date.now()-7200e3},
      {id:'n4', type:'mention', userId:'u5', text:'mentioned you in a story', t:Date.now()-86400e3}
    ]
  });

  function av(name,color){
    return 'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#${color}"/><text x="50" y="60" text-anchor="middle" font-family="Inter,sans-serif" font-size="42" font-weight="700" fill="white">${name[0]}</text></svg>`);
  }

  const Store = {
    get(){
      let raw = LS.getItem(KEY);
      if(!raw){ const s = seed(); LS.setItem(KEY, JSON.stringify(s)); return s; }
      try{ return JSON.parse(raw); } catch{ const s=seed(); LS.setItem(KEY,JSON.stringify(s)); return s; }
    },
    set(s){ LS.setItem(KEY, JSON.stringify(s)); },
    update(fn){ const s = this.get(); fn(s); this.set(s); return s; },
    reset(){ LS.removeItem(KEY); }
  };

  const Auth = {
    session(){ try{ return JSON.parse(LS.getItem(SESSION)||'null'); }catch{return null;} },
    login(email, password){
      if(!email || !password) throw new Error('Email and password required');
      const me = {id:'me', name:email.split('@')[0]||'You', username:(email.split('@')[0]||'you').toLowerCase(), email, avatar:av(email[0]?.toUpperCase()||'M','7c3aed'), bio:'New on Meetwoyou ✨', followers:0, following:0, verified:false};
      LS.setItem(SESSION, JSON.stringify(me));
      return me;
    },
    signup(name,email,password){
      if(!name||!email||!password) throw new Error('All fields required');
      const me = {id:'me', name, username:name.toLowerCase().replace(/\s+/g,'_'), email, avatar:av(name[0]?.toUpperCase()||'M','7c3aed'), bio:'New on Meetwoyou ✨', followers:0, following:0, verified:false};
      LS.setItem(SESSION, JSON.stringify(me));
      return me;
    },
    logout(){ LS.removeItem(SESSION); location.href='index.html'; },
    require(){ const s=this.session(); if(!s){ location.href='index.html'; throw new Error('redirect'); } return s; },
    update(patch){ const me={...this.session(),...patch}; LS.setItem(SESSION,JSON.stringify(me)); return me; }
  };

  // UI helpers
  function toast(msg){
    let t = document.querySelector('.toast');
    if(!t){ t=document.createElement('div'); t.className='toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('show'),1800);
  }
  function timeAgo(ts){
    const s = Math.floor((Date.now()-ts)/1000);
    if(s<60) return s+'s';
    if(s<3600) return Math.floor(s/60)+'m';
    if(s<86400) return Math.floor(s/3600)+'h';
    return Math.floor(s/86400)+'d';
  }
  function user(id){ return Store.get().users.find(u=>u.id===id) || {name:'Unknown',avatar:av('?','555'),verified:false}; }

  function navHTML(active){
    const items = [
      {k:'home',h:'feed.html',i:'fa-house'},
      {k:'explore',h:'explore.html',i:'fa-compass'},
      {k:'create',h:'camera.html',i:'fa-plus',cls:'create'},
      {k:'inbox',h:'messages.html',i:'fa-paper-plane'},
      {k:'me',h:'profile.html',i:'fa-user'}
    ];
    return `<nav class="bottom-nav"><div class="bottom-nav-inner">${items.map(it=>`
      <a class="nav-item ${it.cls||''} ${it.k===active?'active':''}" href="${it.h}">
        <i class="fa-solid ${it.i}"></i>
        <span>${it.k==='create'?'':it.k[0].toUpperCase()+it.k.slice(1)}</span>
      </a>`).join('')}</div></nav>`;
  }

  function headerHTML(title){
    return `<header class="app-header">
      <div class="brand-row"><img src="assets/icon-192.png" alt=""/><div class="brand">${title||'Meetwoyou'}</div></div>
      <div style="display:flex;gap:4px">
        <a class="icon-btn" href="notifications.html" title="Notifications"><i class="fa-regular fa-heart"></i></a>
        <a class="icon-btn" href="messages.html" title="Messages"><i class="fa-regular fa-paper-plane"></i></a>
      </div>
    </header>`;
  }

  // Service worker registration
  if('serviceWorker' in navigator){
    window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
  }

  window.MW = { Store, Auth, toast, timeAgo, user, navHTML, headerHTML, av };
})();
