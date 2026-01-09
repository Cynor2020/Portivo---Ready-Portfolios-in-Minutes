import { useState, useEffect } from 'react';
import { MessageCircle, Mail, Phone, Search, Plus, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Support = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'Technical',
    priority: 'Medium',
    message: ''
  });

  useEffect(() => {
    if (activeTab === 'tickets') {
      fetchTickets();
    }
  }, [activeTab]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/tickets');
      setTickets(data.data);
    } catch (error) {
      console.error('Failed to fetch tickets', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      await api.post('/tickets', newTicket);
      setNewTicket({ subject: '', category: 'Technical', priority: 'Medium', message: '' });
      fetchTickets();
      setActiveTab('tickets'); // Switch back to list view if I implement a separate view, but here I'll keep it simple
      alert('Ticket created successfully!');
    } catch (error) {
      console.error('Failed to create ticket', error);
      alert('Failed to create ticket');
    } finally {
      setCreating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-blue-400 bg-blue-400/10';
      case 'In Progress': return 'text-yellow-400 bg-yellow-400/10';
      case 'Resolved': return 'text-green-400 bg-green-400/10';
      case 'Closed': return 'text-zinc-400 bg-zinc-400/10';
      default: return 'text-zinc-400 bg-zinc-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Support Center</h1>
        
        <div className="flex flex-wrap gap-4 mb-8 border-b border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'tickets'
                ? 'bg-purple-main text-white'
                : 'bg-zinc-800 text-text-secondary hover:bg-zinc-700'
            }`}
          >
            <FileText size={18} />
            My Tickets
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'create'
                ? 'bg-purple-main text-white'
                : 'bg-zinc-800 text-text-secondary hover:bg-zinc-700'
            }`}
          >
            <Plus size={18} />
            New Ticket
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'bg-purple-main text-white'
                : 'bg-zinc-800 text-text-secondary hover:bg-zinc-700'
            }`}
          >
            <Phone size={18} />
            Contact Info
          </button>
        </div>

        {activeTab === 'tickets' && (
          <div className="space-y-4">
            {loading ? (
              <p className="text-text-secondary">Loading tickets...</p>
            ) : tickets.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-xl border border-zinc-800">
                <MessageCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text-primary mb-2">No tickets found</h3>
                <p className="text-text-secondary mb-6">You haven't created any support tickets yet.</p>
                <button 
                  onClick={() => setActiveTab('create')}
                  className="px-6 py-2 bg-purple-main text-white rounded-lg hover:bg-purple-600"
                >
                  Create Ticket
                </button>
              </div>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket._id} className="bg-card p-6 rounded-xl border border-zinc-800 hover:border-purple-500/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-1">{ticket.subject}</h3>
                      <p className="text-sm text-text-secondary flex items-center gap-2">
                        <Clock size={14} />
                        {new Date(ticket.createdAt).toLocaleDateString()}
                        <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                        {ticket.category}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-zinc-400 line-clamp-2">{ticket.message}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto bg-card p-8 rounded-xl border border-zinc-800">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Create New Ticket</h2>
            <form onSubmit={handleCreateTicket} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-primary focus:outline-none focus:border-purple-main"
                  placeholder="Brief description of the issue"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-primary focus:outline-none focus:border-purple-main"
                  >
                    <option>Technical</option>
                    <option>Billing</option>
                    <option>Account</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-primary focus:outline-none focus:border-purple-main"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                <textarea
                  required
                  rows={6}
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-primary focus:outline-none focus:border-purple-main resize-none"
                  placeholder="Describe your issue in detail..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('tickets')}
                  className="px-6 py-3 rounded-lg font-medium text-text-secondary hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-8 py-3 bg-purple-main hover:bg-purple-600 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Submit Ticket'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'contact' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-card p-6 rounded-xl border border-zinc-800 text-center">
               <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Mail size={24} />
               </div>
               <h3 className="text-lg font-bold text-white mb-2">Email Support</h3>
               <p className="text-text-secondary mb-1">support@portivo.com</p>
               <p className="text-xs text-zinc-500">Response within 24h</p>
             </div>
             <div className="bg-card p-6 rounded-xl border border-zinc-800 text-center">
               <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                 <MessageCircle size={24} />
               </div>
               <h3 className="text-lg font-bold text-white mb-2">Live Chat</h3>
               <p className="text-text-secondary mb-1">Available on Pro</p>
               <p className="text-xs text-zinc-500">Mon-Fri, 9am-6pm</p>
             </div>
             <div className="bg-card p-6 rounded-xl border border-zinc-800 text-center">
               <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Phone size={24} />
               </div>
               <h3 className="text-lg font-bold text-white mb-2">Phone Support</h3>
               <p className="text-text-secondary mb-1">+1 (555) 123-4567</p>
               <p className="text-xs text-zinc-500">Enterprise Only</p>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default Support;
