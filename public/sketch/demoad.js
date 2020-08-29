(function () {
  var filename = 'https://tympanus.net/codrops/adpacks/demoad.css';
  var fileref = document.createElement('link');
  fileref.setAttribute('rel', 'stylesheet');
  fileref.setAttribute('type', 'text/css');
  fileref.setAttribute('href', filename);
  document.getElementsByTagName('head')[0].appendChild(fileref);

  let cdaSpots = ['ad4', 'ad5'];
  let cdaSpot = cdaSpots[Math.floor(Math.random() * cdaSpots.length)];

  switch (cdaSpot) {
    case 'ad1':
      var cdaLink =
        'https://themes.muffingroup.com/betheme/?utm_source=tympanus.net&utm_medium=article&utm_campaign=may20';
      var cdaImg =
        'https://tympanus.net/codrops/wp-content/banners/bethemedemo.jpg';
      var cdaImgAlt = 'BeTheme';
      var cdaText =
        'BeTheme is a multipurpose WordPress theme that helps you build any type of website in a few hours';
      break;
    case 'ad2':
      var cdaLink = 'https://bit.ly/2Jen9Md';
      var cdaImg = 'https://tympanus.net/codrops/wp-content/banners/amelia.png';
      var cdaImgAlt = 'Amelia';
      var cdaText =
        'Build time-saving appointment and event booking websites easily with the Amelia WordPress plugin.';
      break;
    case 'ad3':
      var cdaLink = 'https://synd.co/2LCWWbn';
      var cdaImg = 'https://tympanus.net/codrops/wp-content/banners/nwdemo.png';
      var cdaImgAlt = 'Northwestern';
      var cdaText =
        'Build skills to lead communication strategy, translate complex data, and drive user experience.';
      break;
    case 'ad4':
      var cdaLink = 'https://ad.doubleclick.net/ddm/clk/468661219;274024538;n';
      var cdaImg =
        'https://tympanus.net/codrops/wp-content/banners/mailchimp_demo.png';
      var cdaImgAlt = 'Mailchimp';
      var cdaText =
        "Don't spend all day sending messages. Automatically reach out to fans based on how they behave.";
      break;
    case 'ad5':
      var cdaLink = 'https://ad.doubleclick.net/ddm/clk/468663188;274327225;t';
      var cdaImg =
        'https://tympanus.net/codrops/wp-content/banners/mailchimp_demo.png';
      var cdaImgAlt = 'Mailchimp';
      var cdaText =
        'Reach inboxes when it matters most. Instantly deliver transactional emails to your customers.';
      break;
    default:
      var cdaLink =
        'https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=17972_5_1_16';
      var cdaImg =
        'https://tympanus.net/codrops/wp-content/banners/Divi_Carbon.jpg';
      var cdaImgAlt = 'Divi';
      var cdaText =
        "From our sponsor: Divi is more than just a WordPress theme, it's a completely new website building platform. Try it.";
  }

  var cda = document.createElement('div');
  cda.id = 'cdawrap';
  cda.style.display = 'none';
  cda.innerHTML =
    '<a href="' +
    cdaLink +
    '" class="carbon-img" target="_blank" rel="noopener"><img src="' +
    cdaImg +
    '" alt="' +
    cdaImgAlt +
    '" border="0" height="100" width="130"></a><a href="' +
    cdaLink +
    '" class="carbon-text" target="_blank" rel="noopener">' +
    cdaText +
    '</a><div class="cda-footer"><a class="carbon-poweredby" href="https://tympanus.net/codrops/advertise/" target="_blank" rel="noopener">Become a sponsor</a><span class="cda-remove" id="cda-remove">Close</span></div>';
  document.getElementsByTagName('body')[0].appendChild(cda);

  setTimeout(function () {
    cda.style.display = 'block';
  }, 1000);

  document.getElementById('cda-remove').addEventListener('click', function (e) {
    cda.style.display = 'none';
    e.preventDefault();
  });
})();
