import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockContacts, mockCompany, availableTopics, Contact } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Mail, Phone, MessageSquare, Save, Plus, Trash2, Check } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(mockCompany.topics);

  const handleContactUpdate = (id: string, field: keyof Contact, value: any) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  const handleChannelToggle = (id: string, channel: 'email' | 'sms' | 'calls') => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id
          ? { ...contact, channels: { ...contact.channels, [channel]: !contact.channels[channel] } }
          : contact
      )
    );
  };

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSave = () => {
    toast.success("Settings saved");
  };

  const handleAddContact = () => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name: "",
      role: "",
      email: "",
      phone: "",
      channels: { email: true, sms: false, calls: false },
      frequency: "daily",
      highImpactOnly: false,
    };
    setContacts(prev => [...prev, newContact]);
  };

  const handleRemoveContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-lg font-semibold text-foreground mb-6">Settings</h1>

        <div className="space-y-8">
          {/* Topics */}
          <section>
            <h2 className="text-sm font-medium text-foreground mb-3">Topics</h2>
            <div className="grid grid-cols-2 gap-2">
              {availableTopics.map((topic) => {
                const isSelected = selectedTopics.includes(topic.id);
                return (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicToggle(topic.id)}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border text-left text-sm transition-colors",
                      isSelected
                        ? "border-foreground bg-secondary"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center",
                      isSelected ? "bg-foreground border-foreground" : "border-muted-foreground"
                    )}>
                      {isSelected && <Check className="w-3 h-3 text-background" />}
                    </div>
                    <span className="text-foreground">{topic.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Contacts */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-foreground">Notification Contacts</h2>
              <Button onClick={handleAddContact} variant="ghost" size="sm" className="gap-1">
                <Plus className="w-3 h-3" />
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-4 rounded-lg border border-border">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Input
                      value={contact.name}
                      onChange={(e) => handleContactUpdate(contact.id, 'name', e.target.value)}
                      placeholder="Name"
                    />
                    <Input
                      value={contact.role}
                      onChange={(e) => handleContactUpdate(contact.id, 'role', e.target.value)}
                      placeholder="Role"
                    />
                    <Input
                      type="email"
                      value={contact.email}
                      onChange={(e) => handleContactUpdate(contact.id, 'email', e.target.value)}
                      placeholder="Email"
                    />
                    <Input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => handleContactUpdate(contact.id, 'phone', e.target.value)}
                      placeholder="Phone"
                    />
                  </div>

                  {/* Channels */}
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs text-muted-foreground">Channels:</span>
                    {[
                      { key: 'email' as const, icon: Mail, label: 'Email' },
                      { key: 'sms' as const, icon: MessageSquare, label: 'SMS' },
                      { key: 'calls' as const, icon: Phone, label: 'Calls' },
                    ].map((channel) => (
                      <button
                        key={channel.key}
                        onClick={() => handleChannelToggle(contact.id, channel.key)}
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors",
                          contact.channels[channel.key]
                            ? "bg-foreground text-background"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        <channel.icon className="w-3 h-3" />
                        {channel.label}
                      </button>
                    ))}
                  </div>

                  {/* Options */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <select
                        value={contact.frequency}
                        onChange={(e) => handleContactUpdate(contact.id, 'frequency', e.target.value)}
                        className="px-2 py-1 rounded bg-secondary border-0 text-xs text-foreground"
                      >
                        <option value="realtime">Real-time</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>

                      <button
                        onClick={() => handleContactUpdate(contact.id, 'highImpactOnly', !contact.highImpactOnly)}
                        className={cn(
                          "px-2 py-1 rounded text-xs transition-colors",
                          contact.highImpactOnly
                            ? "bg-red-50 text-red-700"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        High impact only
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveContact(contact.id)}
                      className="p-1 text-muted-foreground hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Save */}
          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
