import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  animate,
  style,
  transition,
  trigger,
  query,
  stagger,
} from '@angular/animations';

interface Post {
  id: number;
  username: string;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  imports: [CommonModule, MatCardModule],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class FeedComponent implements OnInit {
  isDarkMode = true; // Modo dark por padrão
  posts: Post[] = [
    {
      id: 1,
      username: 'Usuario1',
      content: 'Este é um exemplo de post!',
      timestamp: new Date(),
    },
    {
      id: 2,
      username: 'Usuario2',
      content: 'Outro post interessante aqui!',
      timestamp: new Date(),
    },
    {
      id: 3,
      username: 'Usuario3',
      content: 'Reclame aqui é muito útil!',
      timestamp: new Date(),
    },
  ];

  ngOnInit() {
   
  }

  // Métodos para adicionar e remover a classe de animação
  onMouseEnter(event: MouseEvent) {
    const postElement = event.currentTarget as HTMLElement;
    postElement.classList.add('animate');
  }

  onMouseLeave(event: MouseEvent) {
    const postElement = event.currentTarget as HTMLElement;
    postElement.classList.remove('animate');
  }
}
