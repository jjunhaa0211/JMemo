import UIKit
import WebKit
import SnapKit
import Then
import VisitHistoryWebView

class ViewController: UIViewController {
    var webView: WKWebView!
    var initialURL: URL?

    private let backButton = UIButton().then {
        $0.setImage(UIImage(systemName: "arrow.left"), for: .normal)
        $0.tintColor = .gray
    }
    private let forwardButton = UIButton().then {
        $0.setImage(UIImage(systemName: "arrow.right"), for: .normal)
        $0.tintColor = .gray
    }
    private let homeButton = UIButton().then {
        $0.setImage(UIImage(systemName: "house"), for: .normal)
    }
    private let refreshButton = UIButton().then {
        $0.setImage(UIImage(systemName: "arrow.clockwise"), for: .normal)
    }
    private let historyButton = UIButton().then {
        $0.setImage(UIImage(systemName: "book"), for: .normal)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        HistoryManager.shared.configureStorageType(.userDefaults)
        setupWebView()
        setupButtons()
        loadInitialURL()
        updateNavigationButtons()
    }

    func setupWebView() {
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webConfiguration.userContentController.add(self, name: "pinHandler")
        webView.navigationDelegate = self
        webView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(webView)

        webView.snp.makeConstraints {
            $0.top.equalTo(view.safeAreaLayoutGuide)
            $0.leading.trailing.equalToSuperview()
            $0.bottom.equalTo(view.safeAreaLayoutGuide.snp.bottom).offset(-50)
        }
    }

    func setupButtons() {
        backButton.addTarget(self, action: #selector(backAction), for: .touchUpInside)
        forwardButton.addTarget(self, action: #selector(forwardAction), for: .touchUpInside)
        homeButton.addTarget(self, action: #selector(homeAction), for: .touchUpInside)
        refreshButton.addTarget(self, action: #selector(refreshAction), for: .touchUpInside)
        historyButton.addTarget(self, action: #selector(showHistory), for: .touchUpInside)

        let stackView = UIStackView(arrangedSubviews: [backButton, forwardButton, refreshButton, homeButton, historyButton]).then {
            $0.distribution = .fillEqually
            $0.axis = .horizontal
        }
        view.addSubview(stackView)

        stackView.snp.makeConstraints {
            $0.bottom.equalTo(view.safeAreaLayoutGuide)
            $0.leading.trailing.equalToSuperview()
            $0.height.equalTo(50)
        }
    }

    @objc func backAction() {
        if webView.canGoBack {
            webView.goBack()
            updateNavigationButtons()
        }
    }

    @objc func forwardAction() {
        if webView.canGoForward {
            webView.goForward()
            updateNavigationButtons()
        }
    }

    @objc func homeAction() {
        loadWebApp()
        webView.reload()
    }

    @objc func refreshAction() {
        webView.reload()
        updateNavigationButtons()
    }

    @objc func showHistory() {
        let historyVC = HistoryViewController(style: .plain)
        navigationController?.pushViewController(historyVC, animated: true)
    }

    func loadInitialURL() {
        if let url = initialURL {
            let request = URLRequest(url: url)
            webView.load(request)
        } else {
            loadWebApp()
        }
    }

    func loadWebApp() {
        if let url = URL(string: "https://jjunhaa0211.github.io/JMemo/") {
            let request = URLRequest(url: url)
            webView.load(request)
        }
        updateNavigationButtons()
    }

    func updateNavigationButtons() {
        backButton.isEnabled = webView.canGoBack
        forwardButton.isEnabled = webView.canGoForward

        let color = UIColor(hex: "#F4C19E")
        backButton.tintColor = webView.canGoBack ? color : .gray
        forwardButton.tintColor = webView.canGoForward ? color : .gray
        homeButton.tintColor = color
        refreshButton.tintColor = color
        historyButton.tintColor = color
    }

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        view.endEditing(true)
    }
}

extension ViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        if let url = webView.url {
            do {
                try HistoryManager.shared.addHistory(url, shouldPrint: true)
            } catch {
                print("Failed to add URL to history: \(error)")
            }
        }
        updateNavigationButtons()
    }
}

extension ViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "pinHandler", let body = message.body as? [String: Any], let id = body["id"] as? String, let title = body["title"] as? String, let isPinned = body["isPinned"] as? Bool {
            let pinStatus = isPinned ? "켜짐" : "꺼짐"
            let alertController = UIAlertController(title: "핀 설정", message: "제목: \(title) \n 핀 상태: \(pinStatus)", preferredStyle: .alert)
            print("아이템 ID: \(id), 제목: \(title), 핀 상태: \(pinStatus)")
            alertController.addAction(UIAlertAction(title: "확인", style: .default))
            present(alertController, animated: true)
        }
    }
}
