export type Question = {
  id: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'rating';
  label: string;
  category: string;
  options?: string[];
  placeholder?: string;
};

export const categories = [
  "Soziodemografische Angaben",
  "Wahrnehmung der elterlichen Trennung",
  "Beziehung zu Bezugspersonen in der Kindheit",
  "Nähe und Vertrauen in Partnerschaften",
  "Verlustangst und Unsicherheit",
  "Distanz und Unabhängigkeit",
  "Konfliktverhalten in Beziehungen",
  "Zusammenhang zwischen Kindheit und Beziehung",
  "Abschluss"
];

export const questions: Question[] = [
  { id: 'q1', category: 'Soziodemografische Angaben', type: 'number', label: '1. Alter', placeholder: 'Dein Alter' },
  { id: 'q2', category: 'Soziodemografische Angaben', type: 'select', label: '2. Geschlecht', options: ['Weiblich', 'Männlich', 'Divers', 'Keine Angabe'] },
  { id: 'q3', category: 'Soziodemografische Angaben', type: 'select', label: '3. Aktueller Beziehungsstatus', options: ['Ledig', 'In einer Beziehung', 'Verlobt', 'Verheiratet', 'Geschieden', 'Verwitwet'] },
  { id: 'q4', category: 'Soziodemografische Angaben', type: 'number', label: '4. Wie alt waren Sie, als sich Ihre Eltern getrennt haben?', placeholder: 'Alter in Jahren' },
  { id: 'q5', category: 'Soziodemografische Angaben', type: 'select', label: '5. Bei welchem Elternteil sind Sie überwiegend aufgewachsen?', options: ['Mutter', 'Vater', 'Beide gleichermaßen', 'Bei anderen Bezugspersonen'] },
  
  { id: 'q6', category: 'Wahrnehmung der elterlichen Trennung', type: 'textarea', label: '6. Wie haben Sie die Trennung Ihrer Eltern damals erlebt?' },
  { id: 'q7', category: 'Wahrnehmung der elterlichen Trennung', type: 'textarea', label: '7. Welche Gefühle oder Gedanken verbinden Sie heute mit dieser Zeit?' },
  { id: 'q7_rate', category: 'Wahrnehmung der elterlichen Trennung', type: 'rating', label: 'Wie stark belastet Sie dieses Thema heute noch? (1 = gar nicht, 10 = sehr stark)' },
  { id: 'q8', category: 'Wahrnehmung der elterlichen Trennung', type: 'textarea', label: '8. Wie hat sich Ihre Beziehung zu Ihren Eltern nach der Trennung verändert?' },
  { id: 'q9', category: 'Wahrnehmung der elterlichen Trennung', type: 'textarea', label: '9. Gab es Konflikte zwischen Ihren Eltern nach der Trennung? Wie haben Sie diese erlebt?' },

  { id: 'q10', category: 'Beziehung zu Bezugspersonen in der Kindheit', type: 'textarea', label: '10. Wie würden Sie Ihre Beziehung zu Ihren Eltern in der Kindheit beschreiben?' },
  { id: 'q11', category: 'Beziehung zu Bezugspersonen in der Kindheit', type: 'textarea', label: '11. Gab es eine Person, bei der Sie sich besonders sicher oder unterstützt gefühlt haben?' },
  { id: 'q12', category: 'Beziehung zu Bezugspersonen in der Kindheit', type: 'textarea', label: '12. Wie haben Ihre Eltern auf Ihre Gefühle oder Probleme reagiert?' },

  { id: 'q13', category: 'Nähe und Vertrauen in Partnerschaften', type: 'textarea', label: '13. Welche Bedeutung hat emotionale Nähe für Sie in einer Partnerschaft?' },
  { id: 'q15', category: 'Nähe und Vertrauen in Partnerschaften', type: 'textarea', label: '15. Wie erleben Sie emotionale Nähe zu einer Partnerperson?' },
  { id: 'q16', category: 'Nähe und Vertrauen in Partnerschaften', type: 'textarea', label: '16. Fällt es Ihnen leicht oder schwer, anderen Menschen zu vertrauen? Warum?' },
  { id: 'q16_rate', category: 'Nähe und Vertrauen in Partnerschaften', type: 'rating', label: 'Wie leicht fällt es Ihnen generell, anderen zu vertrauen? (1 = sehr schwer, 10 = sehr leicht)' },
  { id: 'q17', category: 'Nähe und Vertrauen in Partnerschaften', type: 'textarea', label: '17. Wie reagieren Sie, wenn eine Partnerperson Ihnen emotional sehr nahe kommt?' },

  { id: 'q18', category: 'Verlustangst und Unsicherheit', type: 'textarea', label: '18. Haben Sie manchmal Angst davor, von einer Partnerperson verletzt oder verlassen zu werden? Wenn ja, wie äußert sich das?' },
  { id: 'q18_rate', category: 'Verlustangst und Unsicherheit', type: 'rating', label: 'Wie stark ist Ihre Angst vor Verlust in einer Beziehung? (1 = gar nicht, 10 = sehr stark)' },
  { id: 'q19', category: 'Verlustangst und Unsicherheit', type: 'textarea', label: '19. Welche Gedanken oder Gefühle entstehen bei Ihnen, wenn eine Partnerperson Distanz zeigt?' },
  { id: 'q20', category: 'Verlustangst und Unsicherheit', type: 'textarea', label: '20. Wie wichtig ist es für Sie, von Ihrer Partnerperson Bestätigung oder Aufmerksamkeit zu bekommen?' },

  { id: 'q21', category: 'Distanz und Unabhängigkeit', type: 'textarea', label: '21. Welche Bedeutung hat Unabhängigkeit für Sie in einer Partnerschaft?' },
  { id: 'q22', category: 'Distanz und Unabhängigkeit', type: 'textarea', label: '22. Gibt es Situationen in Beziehungen, in denen Sie sich lieber zurückziehen oder Abstand nehmen?' },
  { id: 'q23', category: 'Distanz und Unabhängigkeit', type: 'textarea', label: '23. Gibt es Situationen, in denen Sie Nähe vermeiden, obwohl Sie sich eigentlich eine Beziehung wünschen?' },

  { id: 'q24', category: 'Konfliktverhalten in Beziehungen', type: 'textarea', label: '24. Wie gehen Sie normalerweise mit Konflikten in einer Partnerschaft um?' },
  { id: 'q25', category: 'Konfliktverhalten in Beziehungen', type: 'textarea', label: '25. Wie reagieren Sie, wenn Sie sich von einer Partnerperson missverstanden fühlen?' },
  { id: 'q26', category: 'Konfliktverhalten in Beziehungen', type: 'textarea', label: '26. Was ist Ihnen persönlich besonders wichtig für eine stabile Beziehung?' },

  { id: 'q27', category: 'Zusammenhang zwischen Kindheit und Beziehung', type: 'textarea', label: '27. Glauben Sie, dass die Trennung Ihrer Eltern Ihr Verhalten oder Ihre Erwartungen in Beziehungen beeinflusst hat? Wenn ja, wie?' },
  { id: 'q27_rate', category: 'Zusammenhang zwischen Kindheit und Beziehung', type: 'rating', label: 'Wie stark glauben Sie, hat die Trennung Ihre heutigen Beziehungen beeinflusst? (1 = gar nicht, 10 = extrem)' },
  { id: 'q28', category: 'Zusammenhang zwischen Kindheit und Beziehung', type: 'textarea', label: '28. Gibt es Erfahrungen aus Ihrer Kindheit, die Ihrer Meinung nach Ihre heutige Beziehungen geprägt haben?' },

  { id: 'q29', category: 'Abschluss', type: 'textarea', label: 'Gibt es noch etwas, das Sie im Zusammenhang mit der Trennung Ihrer Eltern und Ihren eigenen Beziehungen ergänzen möchten?' }
];
