const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

class Footer extends Component {
    render() {
        const {
            logo,
            logoUrl,
            siteUrl,
            siteTitle,
            siteYear,
            author,
            links,
            showVisitorCounter,
            visitorCounterTitle,
            icp,
            police,
            policeUrl
        } = this.props;

        let footerLogo = '';
        if (logo) {
            if (logo.text) {
                footerLogo = logo.text;
            } else {
                footerLogo = <img src={logoUrl} alt={siteTitle} height="28" />;
            }
        } else {
            footerLogo = siteTitle;
        }

        return <footer class="footer">
            <div class="container">
                <div class="level">
                    <div class="level-start">
                        <a class="footer-logo is-block mb-2" href={siteUrl}>
                            {footerLogo}
                        </a>
                        <p class="is-size-7">
                            <span dangerouslySetInnerHTML={{ __html: `&copy; ${siteYear} ${author || siteTitle}` }}></span>
                            &nbsp;&nbsp;Powered by <a href="https://hexo.io/" target="_blank" rel="noopener">Hexo</a>&nbsp;&&nbsp;
                            <a href="https://github.com/ppoffice/hexo-theme-icarus" target="_blank" rel="noopener">Icarus</a>
                            {showVisitorCounter ? <br /> : null}
                            {showVisitorCounter ? <span id="busuanzi_container_site_uv"
                                dangerouslySetInnerHTML={{ __html: visitorCounterTitle }}></span> : null}
                        </p>
                    </div>
                    <div class="level-end">
                        {Object.keys(links).length ? <div class="field has-addons">
                            {Object.keys(links).map(name => {
                                const link = links[name];
                                return <p class="control">
                                    <a class={`button is-transparent ${link.icon ? 'is-large' : ''}`} target="_blank" rel="noopener" title={name} href={link.url}>
                                        {link.icon ? <i class={link.icon}></i> : name}
                                    </a>
                                </p>;
                            })}
                        </div> : null}
                        {icp ? <div className="field has-addons has-addons-right" style="margin:0">
                            <a className="button is-transparent" style="padding:0;align-items:flex-end;" target="_blank"
                               rel="noopener" href="https://beian.miit.gov.cn/">
                                <p className="is-size-7">{icp}</p>
                            </a>
                        </div> : null}
                        {police ? <div className="field has-addons has-addons-right" style="margin:0">
                            <a className="button is-transparent" style="padding:0;align-items:flex-start"
                               target="_blank" rel="noopener"
                               href={policeUrl}>
                                <img className="mr-2" src="/img/icon_icp.png"/>
                                <p className="is-size-7">{police}</p>
                            </a>
                        </div>: null}
                    </div>
                </div>
            </div>
        </footer>;
    }
}

module.exports = cacheComponent(Footer, 'common.footer', props => {
    const { config, helper } = props;
    const { url_for, _p, date } = helper;
    const { logo, title, author, footer, plugins } = config;

    const links = {};
    let icp = undefined;
    let police = undefined;
    let policeUrl = undefined;

    if (footer) {
        if (footer.links) {
            Object.keys(footer.links).forEach(name => {
                const link = footer.links[name];
                links[name] = {
                    url: url_for(typeof link === 'string' ? link : link.url),
                    icon: link.icon
                };
            });
        }
        if (footer.icp) {
            icp = footer.icp;
        }
        if (footer.police) {
            police = footer.police;
        }
        if (footer.policeUrl) {
            policeUrl = footer.policeUrl;
        }
    }

    return {
        logo,
        logoUrl: url_for(logo),
        siteUrl: url_for('/'),
        siteTitle: title,
        siteYear: date(new Date(), 'YYYY'),
        author,
        links,
        showVisitorCounter: plugins && plugins.busuanzi === true,
        visitorCounterTitle: _p('plugin.visitor_count', '<span id="busuanzi_value_site_uv">0</span>'),
        icp,
        police,
        policeUrl
    };
});
