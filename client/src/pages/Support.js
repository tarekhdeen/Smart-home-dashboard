import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Send,
  AlertCircle,
  Youtube,
  Book,
  MessageSquare,
} from "lucide-react";
import "../styles/Support.css";

const Support = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    description: "",
    priority: "medium",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    { id: "getting-started", title: "Getting Started", icon: Book },
    { id: "devices", title: "Device Issues", icon: AlertCircle },
    { id: "connectivity", title: "Connectivity", icon: Youtube },
    { id: "account", title: "Account & Billing", icon: MessageSquare },
  ];

  const faqs = {
    "getting-started": [
      {
        question: "How do I set up my first device?",
        answer:
          'To set up your first device, ensure it is powered on and in pairing mode. Open the app, go to "Add Device" and follow the on-screen instructions. Make sure your phones Bluetooth is enabled during setup.',
      },
      {
        question: "What devices are compatible?",
        answer:
          "Our system is compatible with most major smart home brands including Philips Hue, Samsung SmartThings, Nest, and many others. Check our compatibility list in the app for specific devices.",
      },
    ],
    devices: [
      {
        question: "My device is offline",
        answer:
          "First, check if the device is powered on and within range of your WiFi network. Try power cycling the device by unplugging it for 30 seconds, then plugging it back in. If issues persist, check your WiFi connection.",
      },
      {
        question: "Device is not responding to commands",
        answer:
          "Try refreshing the device in the app. If that does not work, remove the device and add it again. Make sure your app is updated to the latest version.",
      },
    ],
    connectivity: [
      {
        question: "How can I improve device connection?",
        answer:
          "Place your hub centrally in your home, away from metal objects and other electronics. Ensure your WiFi signal is strong where devices are located. Consider using WiFi extenders for large homes.",
      },
      {
        question: "What are the WiFi requirements?",
        answer:
          "Our system works with both 2.4GHz and 5GHz networks. For optimal performance, we recommend a stable connection with at least 10Mbps download speed.",
      },
    ],
    account: [
      {
        question: "How do I change my subscription?",
        answer:
          "Go to Account Settings > Subscription to view and modify your current plan. Changes will take effect at the start of your next billing cycle.",
      },
      {
        question: "Can I transfer my devices to another account?",
        answer:
          "Yes, you can transfer devices between accounts. Remove the device from your current account first, then add it to the new account following the standard setup process.",
      },
    ],
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // Handle ticket submission logic here
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setTicketForm({
        name: "",
        email: "",
        subject: "",
        category: "",
        description: "",
        priority: "medium",
      });
    }, 3000);
  };

  const ContactCard = ({ icon: Icon, title, content, action, actionText }) => (
    <div className="contact-card">
      <div className="contact-icon">
        <Icon className="icon-medium" />
      </div>
      <h3>{title}</h3>
      <p>{content}</p>
      <button className="button button-outline" onClick={action}>
        {actionText}
      </button>
    </div>
  );

  ContactCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    actionText: PropTypes.string.isRequired,
  };

  return (
    <div className="container">
      <div className="support-container">
        <div className="support-header">
          <div className="header-title">
            <HelpCircle className="header-icon" />
            <h1 className="main-title">Support Center</h1>
          </div>
        </div>

        {/* Contact Options */}
        <div className="contact-grid">
          <ContactCard
            icon={MessageCircle}
            title="Live Chat"
            content="Chat with our support team"
            actionText="Start Chat"
            action={() => {}}
          />
          <ContactCard
            icon={Phone}
            title="Phone Support"
            content="Call us at 1-800-SMART-HOME"
            actionText="Call Now"
            action={() => {}}
          />
          <ContactCard
            icon={Mail}
            title="Email Support"
            content="Get help via email"
            actionText="Send Email"
            action={() => {}}
          />
        </div>

        {/* FAQ Section */}
        <div className="support-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-categories">
            {categories.map((category) => (
              <div key={category.id} className="category-section">
                <button
                  className={`category-button ${activeCategory === category.id ? "active" : ""}`}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category.id ? null : category.id
                    )
                  }
                >
                  <div className="category-button-content">
                    <category.icon className="icon-small" />
                    <span>{category.title}</span>
                  </div>
                  {activeCategory === category.id ? (
                    <ChevronUp className="icon-small" />
                  ) : (
                    <ChevronDown className="icon-small" />
                  )}
                </button>
                {activeCategory === category.id && (
                  <div className="faq-list">
                    {faqs[category.id].map((faq, index) => (
                      <div key={index} className="faq-item">
                        <button
                          className="faq-question"
                          onClick={() =>
                            setActiveFaq(activeFaq === index ? null : index)
                          }
                        >
                          <span>{faq.question}</span>
                          {activeFaq === index ? (
                            <ChevronUp className="icon-small" />
                          ) : (
                            <ChevronDown className="icon-small" />
                          )}
                        </button>
                        {activeFaq === index && (
                          <div className="faq-answer">{faq.answer}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="support-section">
          <h2 className="section-title">Submit a Support Ticket</h2>
          <form className="ticket-form" onSubmit={handleTicketSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={ticketForm.name}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={ticketForm.email}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, subject: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={ticketForm.category}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={ticketForm.description}
                  onChange={(e) =>
                    setTicketForm({
                      ...ticketForm,
                      description: e.target.value,
                    })
                  }
                  required
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={ticketForm.priority}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, priority: e.target.value })
                  }
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <button type="submit" className="button button-blue">
              <Send className="icon-small" />
              Submit Ticket
            </button>
          </form>
          {submitSuccess && (
            <div className="success-message">
              Your ticket has been submitted successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
